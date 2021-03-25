const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const argon = require('argon2') // Passwords hash
const jwt = require('jsonwebtoken')
const app = express()
const port = 8000
const IP = '192.168.1.40'

var tokenKey = '1a45-3caj-05fi-paof';
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('database.sqlite3');
app.use(cors({ origin: '*' }));
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/authenticated', function (req, res, next) {
    if (!req.headers.authorization) return res.status(404).json({ message: 'Not authenticated' });
    else {
        jwt.verify(req.headers.authorization, tokenKey, (err, payload) => {
            if (!err) next();
            //else if(payload){
            //    if (payload.login === 'admin'){
            //        next() 
            //    }
            //}
            else res.status(404).json({ message: 'bad login', error: err, token: req.headers.authorization });
        })
    }
})

app.post('/api/register', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    db.all("SELECT * FROM Profile where login =(?)", [req.body.login], (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                res.status(200).json({ code: 1 });
            }
            else {
                var hashedPassword
                argon.hash(req.body.password).then(hash => {
                    hashedPassword = hash;
                    db.run('INSERT INTO Profile VALUES(NULL,?,?,?)', [req.body.login, hashedPassword, 0], function (err) {
                        if (err) console.log('Error while adding profile: ', err);
                        else {
                            res.status(201).json({ code: 2 });
                        }
                    })
                })

            }
        }
        else { console.log('Registration error: ', err); res.sendStatus(400) }
    })
})

app.post('/api/auth', (req, res) => {
    if (!req.body) { console.log('Body error'); res.sendStatus(400); }
    else {
        db.all("SELECT * FROM Profile where login=(?)", [req.body.login], (err, rows) => {
            if (!err) {
                if (rows.length > 0) {
                    argon.verify(rows[0].password, req.body.password).then(match => {
                        if (match) {
                            res.status(200).json({ login: req.body.login, token: jwt.sign({ login: req.body.login }, tokenKey) });
                        }
                        else {
                            res.status(200).json({ message: 'Ошибка входа' });
                        }
                    })
                }
                else { console.log('Error: ', err); res.status(200).json({ code: 1 }) }
            }
            else { console.log('Auth error: ', err); res.status(400) }
        })
    }
})

app.get('/api/authenticated/profile/getProfileCars', (req, res) => {
    if (Object.keys(req.query).length<1) { console.log('Body error'); res.sendStatus(400) }
    else {
        db.all("SELECT * FROM Car WHERE Owner_id = " +
            "(SELECT id FROM Owner WHERE Profile_id=" +
            "(SELECT id FROM Profile WHERE login=(?)))", [req.query.login], (err, rows) => {
                if (err) {
                    console.log('getProfileCars Eror. login: ' + req.query.login + '\nerror: ' + err);
                    res.status(404).json({ message: 'getProfileCars Error:\n' + err })
                }
                else {
                    if (rows.length > 0) {
                        res.status(200).json({ cars: rows })
                    }
                }
            })
        
        //res.status(200).json({ message: 'Authenticated' })
    }
})

app.post('/api/authenticated/profile/registerCar',(req,res)=>{
    let id=''
    if(!req.body.number||!req.body.mark)res.status(404).json({message:'Bad request suka',body:req.body})
    else{
        db.get("SELECT id FROM Owner where Profile_id ="+
        "(SELECT id FROM Profile where login=(?))",[req.body.login],(err,row)=>{
            if(!err){
                db.run("INSERT INTO Car VALUES(null,?,?,?)",[req.body.number,req.body.mark,row.id],(err)=>{
                    if(err){
                        console.log('REGISTER CAR ERROR: '+err);
                        res.status(404).json({message:"Bad request"})
                    }
                    else{
                        res.status(200).json({message:"Car added"})
                    }
                })
            }
            else{
                res.status(404).json({message:'Bad login'})
            }
        })
        
        
    }
})
app.listen(port, IP, () => {
    console.log('Server started ');
})
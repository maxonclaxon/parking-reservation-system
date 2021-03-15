const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const argon = require('argon2') // Passwords hash
const crypto = require('crypto')
const app = express()
const port = 8000

var tokenKey = '1a45-3caj-05fi-paof'
var sqlite3 = require('sqlite3')
var db =  new sqlite3.Database('database.sqlite3')
console.log(db)
app.use(cors({origin:'http://localhost:8080'}))
app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/register',(req,res)=>{
    //codes: 1 - profile exists, 2 - profile created
    console.log('Register. Body:',req.body);
    if(!req.body) return res.sendStatus(400);
    db.all("SELECT * FROM Profiles where login =(?)",[req.body.login],(err,rows)=>{
        if(!err){
            if(rows.length>0){
                res.status(200).json({code:1})
            }
            else {
                var hashedPassword
                argon.hash(req.body.password).then(hash=>{
                    hashedPassword=hash; 
                    console.log(hashedPassword)
                    db.run('INSERT INTO Profiles VALUES(?,?)',[req.body.login,hashedPassword], function(err){
                        if(err)console.log('Error while adding profile: ',err)
                        else {
                            console.log('Profile ',req.body.login,':',hashedPassword,' added')
                            res.status(201).json({code:2})
                        }
                    })
                })
                
            }
        }
        else {console.log('Registration error: ',err); res.sendStatus(400)}
    })
})
app.post('/api/auth',(req,res)=>{
    //codes: 1 - auth error, 2- authenticated
    console.log('Authentication')
    if(!req.body) {res.sendStatus(400)}
    else{
        db.all("SELECT * FROM Profiles where login=(?)",[req.body.login],(err,rows)=>{
            if(!err){
                if(rows.length>0){
                    argon.verify(rows[0].password,req.body.password).then(match=>{
                        if(match){
                            console.log('Пароли совпадают')
                            let head = Buffer.from(JSON.stringify({alg:'HS256', typ:'jwt'})).toString('base64')
                            let body = Buffer.from(JSON.stringify(req.body)).toString('base64')
                            let signature = crypto.createHmac('SHA256',tokenKey).update(head+body).digest('base64')
                            let token = head+'.'+body+'.'+signature
                            res.status(201).json({login:req.body.login,token: token});
                            console.log(token)
                        }
                        else{
                            console.log('Пароли не совпадают')
                            res.status(200).json({code:1})
                        }
                    })
                }
                else{res.sendStatus(200).json({code:1})} 
            }
            else {console.log('Auth error: ',err); res.sendStatus(400)}
        })
    }
})

app.listen(port,() =>{
    console.log('Server started ');
})
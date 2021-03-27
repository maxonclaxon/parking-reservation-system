const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
const argon = require('argon2') // Passwords hash
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);

router.post('/', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    db.all("SELECT * FROM Profile where login =(?)", [req.body.login], (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                res.status(200).json({message:'Profile already exists'});
            }
            else {
                var hashedPassword
                argon.hash(req.body.password).then(hash => {
                    hashedPassword = hash;
                    db.run('INSERT INTO Profile VALUES(NULL,?,?,?)', [req.body.login, hashedPassword, 0], function (err) {
                        if (err){
                            console.log('Error while adding profile: ', err);
                            res.status(404).json({message:'Error while adding profile', error:err});
                        }
                        else {
                            db.get('SELECT id FROM Profile where login = (?)',[req.body.login],(err,row)=>{
                                db.run('INSERT INTO Owner Values(NULL,?,?,?,?,?)',[req.body.pass,req.body.license,
                                req.body.fio,req.body.phone,row.id],(err)=>{
                                    if(err){
                                        console.log('Error while adding Owner');
                                        console.log('inserted vaules: ');
                                        console.log(req.body.pass)
                                        console.log(req.body.license)
                                        console.log(req.body.fio)
                                        console.log(req.body.phone)
                                        console.log(row.id)
                                        res.status(404).json({message:'Error while adding owner',error:err});
                                    }
                                    else{
                                        res.status(200).json({message:'Profile created'});
                                    }
                                })
                            })
                        }
                    })
                })

            }
        }
        else { console.log('Registration error: ', err); res.sendStatus(400) }
    })
})

module.exports = router;
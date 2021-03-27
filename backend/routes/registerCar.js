
const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
const argon = require('argon2') // Passwords hash
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);

router.post('/',(req,res)=>{
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

module.exports = router;
const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
const argon = require('argon2'); // Passwords hash
const { parse } = require('dotenv/lib/main');
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);

router.post('/', (req, res) => {
    if (!req.body) { console.log('Body error'); res.status(404).json({ message: 'body error' }) }
    else {
        let amount = parseFloat(req.body.amount);
        let login = req.body.login;
        let addToBalanceSql="update Owner set Balance=(?) where Owner.Profile_id=(select Profile.id from Profile where Profile.login=(?))"
        let getCurrentBalanceSql="select Owner.Balance from Owner where Owner.Profile_id=(select id from Profile where Profile.login=(?))"
        db.get(getCurrentBalanceSql,[login],(err,row)=>{
            db.run(addToBalanceSql,[parseFloat(row.Balance)+amount, login], (err)=>{
                if(!err){
                    res.status(200).json({message:"Balance added"})
                }
                else{
                    console.log(err)
                    res.status(200).json({message:'Balance dont added'})
                }
            })
        })

        //res.status(200).json({ message: 'Authenticated' })
    }
})


module.exports = router;
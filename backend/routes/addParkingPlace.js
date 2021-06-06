const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3');
const argon = require('argon2');
const { route } = require('./auth');
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name)

router.get('/', (req, res) => {
    console.log('ADDPARKINGPLACE')
    if (1==0) { console.log('Body error'); res.sendStatus(400) } else {
        db.run("insert into Space values(null, (?),(select id from Parking where adress=(?)))",[req.query.floor, req.query.adress],(err)=>{
            if(err){res.status(200).json({message:'NOT OK', err}); console.log(req.query); return;}
            res.status(200).json({messge:'OK'});
            return;
        })
    }
})

module.exports = router;
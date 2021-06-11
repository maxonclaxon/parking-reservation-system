const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
const argon = require('argon2'); // Passwords hash
const { parse } = require('dotenv/lib/main');
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);

router.get('/', (req, res) => {
    console.log('Update status, parkid:' +req.query.parking_id);
    id=req.query.parking_id;
    db.run("update parking_stand set status=3 where parking_stand.id=(?)",[id], (err)=> {
        if(!err){res.status(200).json({message:'OK'});return}
        else{res.status(400).json({message:'NOT OK'});return}
    })
})


module.exports = router;
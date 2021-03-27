const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
const argon = require('argon2') // Passwords hash
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);

router.get('/', (req, res) => {
    var carObject={}
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
                    res.status(200).json({message:'msg', cars:rows});
                   
                }
            })
        
        //res.status(200).json({ message: 'Authenticated' })
    }
})

module.exports = router;
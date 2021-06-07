const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3');
const argon = require('argon2');
const { route } = require('./auth');
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name)

//Получение инфы о всех стоянках пользователя
//параметры: Owner.id(id пользователя)
//Возвращает количество часов стоянки в каждой строке
let getParkingsInLastMin_sql = "select * from Parking_stand where Parking_stand.time_from BETWEEN datetime('now','-1 minutes') and datetime('now')"
router.get('/', (req, res) => {
    var parkings = {};
    if (1==0) { console.log('Body error'); res.sendStatus(400) } else {
        db.all(getParkingsInLastMin_sql,[],(err,rows)=>{
            if(rows.length==0) {res.status(200).json({message:'No parkings'}); return;}
            res.status(200).json({messge:'OK',space_id:rows[0].Space_id+1});
            return;
        })
    }
})

module.exports = router;
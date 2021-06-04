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
let getParkings_sql = "select * from Parking"
router.get('/', (req, res) => {
    var parkings = {};
    if (1==0) { console.log('Body error'); res.sendStatus(400) } else {
        db.all(getParkings_sql,[],(err,rows)=>{
            rows.forEach(row => {
                parkings[row.id]=row.adress;
            });
            res.status(200).json({messge:'OK',parkings});
            return;
        })
    }
})

module.exports = router;
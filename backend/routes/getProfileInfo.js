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
let getProfileStandsInfo = "select Cast((julianday(time_to,'utc')-julianday(time_from,'utc'))*24 as INTEGER) as time from Car,Parking_stand where Car.Owner_id=(?) and Parking_stand.time_from BETWEEN datetime('now','-30 days') and datetime('now') group by Parking_stand.id"
let getOwnerIdSql = "select id, Balance from Owner where Profile_id = (select id from Profile where login = (?))";
router.get('/', (req, res) => {
    var ProfileInfo = {};
    if (Object.keys(req.query).length < 1) { console.log('Body error'); res.sendStatus(400) } else {
        db.get(getOwnerIdSql, [req.query.login], (err, row) => {
            if (err) { res.status(404).json({ message: 'Get profile id error', error: err }); return }
            else {
                ProfileInfo["balance"]=parseFloat(row.Balance);
                db.all(getProfileStandsInfo, [row.id], (err, rows) => {
                    if (err) { console.log('getParkedCars error'); res.status(404).json({ message: 'Get parked cars error', error: err }); return }
                    else{
                        standsCount=0
                        standsTime=0
                        rows.forEach((row,i,rows)=>{
                            standsCount+=1
                            standsTime+=row.time
                        })
                        standsTime=Math.floor(standsTime/standsCount)+(60*((standsTime/standsCount)%1)).toFixed(2)*0.01
                        ProfileInfo["stands"]=standsCount
                        ProfileInfo["time"]=standsTime
                        ProfileInfo["cost"]=standsTime*250
                        ProfileInfo["discount"]=5
                        res.status(200).json({info:ProfileInfo})
                    }
                })
            }
        })
    }
})

module.exports = router;
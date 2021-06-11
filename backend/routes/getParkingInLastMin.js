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
let getParkingsInLastMin_sql = "select *, Space.id as space, Parking_stand.id as stand_id from Parking_stand join Space on Space.id = Parking_stand.Space_id join Parking on Parking.id = Space.Parking_id where Parking.adress = 'parking_model' and Parking_stand.time_from BETWEEN datetime('now','-1 minutes') and datetime('now') and Parking_stand.status=0"
router.get('/', (req, res) => {
    var parkings = {};
    if (1==0) { console.log('Body error'); res.sendStatus(400) } else {
        db.all(getParkingsInLastMin_sql,[],(err,rows)=>{
            if(rows.length==0) {res.status(200).json({message:'No parkings', space_id:-1}); return;}
            else{
                let stand_id = rows[0].stand_id;
                let space_id = rows[0].space-1;
                console.log("ID: " + stand_id);
                console.log("SPACE: "+ space_id);
                db.run("update Parking_stand set status = 1 where id = (?)",[stand_id], (err)=>{
                    if (err){
                        console.log(err);
                        res.status(200).json({message:'Error', space_id:-1})
                        return;
                    }
                    else{
                        res.status(200).json({message:'OK',space_id:space_id, stand_id:stand_id});
                    }
                })
                return;
            }
        })
    }
})

module.exports = router;
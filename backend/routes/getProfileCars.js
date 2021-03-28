const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
const argon = require('argon2') // Passwords hash
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);

//Загрузить запаркованные машины, загрузить не запаркованные машины
let getParkedCarsSql = "select * from (select * from Car cross join (select * from Parking_stand where Car_id in (select id from Car where Owner_id = (?)) and datetime('now') between time_from and time_to) as N on Car.id=N.Car_id where Car.Owner_id=(?) and Car.id in (select Car_id from Parking_stand where (select datetime('now')) between time_from and time_to)) as t1 cross join (select floor, S.id as S_id, adress from Space as S cross join (select adress,id as P_id from Parking) as P on S.Parking_id = P.P_id ) as t2 on t1.Space_id=t2.S_id"
let getNotParkedCarsSql = "select * from Car where Owner_id = (?) and Car.id not in (select Car_id from Parking_stand where (select datetime('now')) between time_from and time_to)"
let getOwnerIdSql = "select id from Owner where Profile_id = (select id from Profile where login = (?))";
router.get('/', (req, res) => {
    var cars = [];
    if (Object.keys(req.query).length < 1) { console.log('Body error'); res.sendStatus(400) }
    else {
        
        //SQL скрипт выбора машин профиля которые в данный момент на парковке
        //select * from Car where Car.Owner_id=1 and id (Если нужно не на парковке, поставить not) in (select Car_id from Parking_stand where (select datetime('now')) between time_from and time_to);
        //SQL скрипт информации о запаркованной машине
        // 
        db.get(getOwnerIdSql, [req.query.login], (err, row) => {
            if (err) { res.status(404).json({ message: 'Get profile id error', error: err }); return }
            
            db.all(getParkedCarsSql, [row.id, row.id], (err, rows) => {
                if (err) {console.log('getParkedCars error'); res.status(404).json({ message: 'Get parked cars error', error: err }); return }
                else {
                    
                    rows.forEach((row, i, rows) => {
                        cars.push({
                            id: row.id,
                            parked:true,
                            number: row.number,
                            model: row.model,
                            status: row.status,
                            time_from: row.time_from,
                            time_to: row.time_to,
                            space_id: row.Space_id,
                            floor: row.floor,
                            adress:row.adress
                        });
                    })

                }
            })
            db.all(getNotParkedCarsSql,[row.id],(err,rows)=>{
                if (err) {console.log('getNotParkedCars error'); res.status(404).json({ message: 'Get not parked cars error', error: err }); return }
                else{
                    rows.forEach((row, i, rows) => {
                        
                        cars.push({
                            id: row.id,
                            parked:false,
                            number: row.number,
                            model: row.model,
                            status: null,
                            time_from: null,
                            time_to: null,
                            space_id: null,
                            floor: null,
                            adress:null
                        });
                    })
                    res.status(200).json({cars:cars});
                }
            })
        })
        
        
        



        //res.status(200).json({ message: 'Authenticated' })
    }
})


module.exports = router;
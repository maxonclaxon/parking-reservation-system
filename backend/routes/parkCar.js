const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
const argon = require('argon2') // Passwords hash
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);

router.post('/', (req, res) => {
    //SQL добавления времени к дате
    // DATETIME(DATETIME('now'),'+X days','+Y hours','+Z seconds')
    //SQL выбора всех происходящих парковок, в промежуток которых не попадает дата
    //select id from Parking_stand where datetime('now','+1 days') not between time_from and time_to; 
    //SQL выбора всех свободных парковочных мест
    //select id from Space where id in (select Space_id from Parking_stand where datetime('now','+5 hours') not between time_from and time_to);
    if (!req.body) { console.log('Body error'); res.status(404).json({ message: 'body error' }) }
    else {
        let spaceID;
        let days = 0;
        let hours = req.body.hours;
        let car_num = req.body.number;
        let adress = req.body.adress;
        let seconds = 0;
        let body = req.body;
        console.log(days + ' ' + hours + ' ' + seconds + ' ' + adress + ' ')
        console.log({ body });
        let getBalanceSql = "select Owner.Balance from Owner where Owner.id = (select Owner_id from Car where Car.number=(?))"
        db.all(getBalanceSql, [car_num], (err, row) => {
            let curbalance = parseFloat(row[0].Balance) - parseFloat(process.env.parking_cost) * parseInt(hours);
            if (curbalance < 0) {
                res.status(200).json({ message: 'Not enough moeny' })
            }
            else {
                console.log(adress)
                db.get("select id from Space where id not in (select Space_id from Parking_stand where datetime('now') between time_from and time_to or datetime('now','+" + days + " days','+" + hours + " hours','+" + seconds + " seconds') between time_from and time_to) and Parking_id=(select id from Parking where adress=(?)) order by random()",
                    [adress], (err, rows) => {
                        if (err) {
                            console.log('Search place error')
                            res.status(404).json({ message: 'Search place error', error: err });
                        }
                        else {
                            if (rows==undefined) { res.status(200).json({ message: 'No free places' }); return };
                            spaceID = rows.id+2;
                            db.get('select id from Car where number=(?)', [car_num], (err, row_carID) => {
                                db.run("INSERT INTO Parking_stand VALUES(NULL,0,datetime('now'),datetime('now','+" + hours + " hours'),?,?)", [spaceID, row_carID.id], (err) => {
                                    if (err) {
                                        console.log('Parking stand reg error');
                                        res.status(404).json({ message: 'Parking stand reg error', error: err });
                                    }
                                    else {
                                        console.log('Car parked');
                                        db.run('update Owner set balance = (?) where Owner.id = (select Owner_id from Car where Car.number = (?))',
                                        [curbalance, car_num], (err)=>{

                                        })
                                        res.status(200).json({ message: 'Car parked' });
                                    }
                                })
                            })
                        }
                    })
            }
        })


        //res.status(200).json({ message: 'Authenticated' })
    }
})


module.exports = router;
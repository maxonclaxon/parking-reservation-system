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
    if (req.body) { console.log('Body error'); res.sendStatus(404) }
    else {
        let time_from = req.body.time_from;
        let time_to = req.body.time_to;
        let spaceID;
        let car_id = req.body.car_id;
        let days = 0;
        let hours = 0;
        let seconds = 0;
        db.get("select id from Space where id in"+ 
        "(select Space_id from Parking_stand where datetime('now','+? days','+? hours','+?seconds') not between time_from and time_to)",
        [days, hours, seconds], (err,row)=>{
            if(err){
                console.log('Search place error')
                res.status(404).json({message:'Search place error', error:err});
            }
            else{
                spaceID = row.id;
                db.run('INSERT INTO Parking_stand VALUES(NULL,0,?,?,?,?)',[time_from,time_to,spaceID,car_id],(err)=>{
                    if(err){
                        console.log('Parking stand reg error');
                        res.status(404).json({message:'Parking stand reg error', error:err});
                    }
                })
            }
        })
        
        
        //res.status(200).json({ message: 'Authenticated' })
    }
})


module.exports = router;
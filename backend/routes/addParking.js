const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3');
const argon = require('argon2');
const { route } = require('./auth');
const { encoding } = require('dotenv/lib/env-options');
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name)

//Получение инфы о всех стоянках пользователя
//параметры: Owner.id(id пользователя)
//Возвращает количество часов стоянки в каждой строке
router.get('/', (req, res) => {
    console.log('addparking')
    if (!req.query) { console.log('Body error:\n'); res.sendStatus(400) } else {
        db.get('select * from Parking where adress=(?)',[req.query.adress],(err,row)=>{
            if(row!=undefined){res.status(200).json({message:'Parking exists'});console.log('SUKA'); return}
            else{
                db.run('Insert into Parking values(null, ?)',[req.query.adress], (err)=>{
                    if(err){res.status(200).json({message:err});console.log('SUKA1');return}
                    else{
                        console.log('aa')
                        res.status(200).json({message:'Parking added'});
                        return
                    }
                })

            }
        })
    }
})

module.exports = router;
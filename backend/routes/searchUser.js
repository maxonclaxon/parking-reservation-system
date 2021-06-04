const express = require('express');
const router = express.Router();
var sqlite3 = require('sqlite3');
const argon = require('argon2');
const { route } = require('./auth');
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name)

//Запрос из бд инфы о пользователе по одному (или нескольким) параметрам. Возвращает объект с пользователем и стоянками
//req.query:login,name,phone,car_num
let verify_login_sql = "select * from Profile where Profile.login=(?)"
let verify_name_or_number_sql = "select * from Owner where Owner.fio=(?) or Owner.phone=(?)";
let verify_car_num_sql = "select * from Car where Car.number=(?)"

router.get('/', (req, res) => {
    params=[]
    let get_user_sql="select * from Profile inner join Owner on Owner.Profile_id=Profile.id inner join Car on Owner.id=Car.Owner_id inner join Parking_stand on Parking_stand.Car_id=Car.id"
    var ProfileInfo = {};
    if (Object.keys(req.query).length < 1) { console.log('Body error'); res.sendStatus(400) } else {
        db.get(verify_login_sql, [req.query.login], (err, row) => {
            if (err) { res.status(404).json({ message: 'Get profile by login error', error: err }); return }
            else {
                if (row!=undefined) params.push(' Profile.login="'+req.query.login+'"')
                else console.log('login not found')
                db.get(verify_name_or_number_sql, [req.query.name, req.query.phone], (err, row) => {
                    if (err) { console.log('Get profile by name or number error'); res.status(404).json({ message: 'Get profile by name or number error', error: err }); return }
                    else{
                        if (row!=undefined) params.push(' Owner.fio="'+req.query.name+'" or Owner.phone="'+req.query.phone+'"')
                        db.get(verify_car_num_sql,[req.query.car_num], (err,row)=>{
                            if (err) { res.status(404).json({ message: 'Get by car_num error', error: err }); return }
                            else{
                                if (row!=undefined) params.push(' Car.number="'+req.query.car_num+'"')
                                if (params.length>0){
                                    get_user_sql+=' where '
                                    for (let i = 0; i < params.length; i++) {
                                        if (i>0){
                                            get_user_sql+=' or '+params[i]
                                        }
                                        else{
                                            get_user_sql+=' '+params[i]
                                        }
                                    }
                                    console.log(get_user_sql)
                                    db.all(get_user_sql,[],(err,rows)=>{
                                        profiles=[]
                                        passport=''
                                        license=''
                                        fio=''
                                        phone=''
                                        balance=''
                                        cars=[]
                                        parks=[]
                                        rows.forEach(row => {
                                            if (!profiles.includes(row.login)) profiles.push(row.login)
                                            if (profiles.length>1){res.status(200).json({message:'Найдено несколько пользователей, уточните поисковой запрос'}); return;}
                                            passport=row.pass;
                                            license=row.license;
                                            fio=row.fio;
                                            phone=row.phone;
                                            balance=row.balance;
                                            if(!cars.includes(row.number)) cars.push(row.number)
                                            parks.push({
                                                number:row.number,
                                                time_from:row.time_from,
                                                time_to:row.time_to,
                                                space_id:row.Space_id,
                                                status:row.status,
                                                model:row.model
                                            })
                                        });
                                        res.status(200).json({message:'OK',profile:{
                                            profiles,passport,license,fio,phone,balance,cars,parks
                                        }})
                                    })
                                }
                                
                            }
                        })
                    }
                })
            }
        })
    }
})

module.exports = router;
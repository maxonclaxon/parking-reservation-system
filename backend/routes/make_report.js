const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);
router.get('/', (req, res) => {
    let report_parking_stands_sql_by_date_difference = "select *, Cast ((JulianDay(time_to) - JulianDay(time_from)) * 24 As Integer) as difference from Parking_stand left join Car on Car.id = Parking_stand.Car_id left join Space on Parking_stand.Space_id = Space.id left join Parking on Space.Parking_id=Parking.id where time_from between datetime('"+req.query.date_from+"') and datetime('"+req.query.date_to+"')";
    //надо разделить на общее кол-во мест на парковке сделать возможность выбора парковки (или выводв сей инфы если парковка не выбрана)
    //сделать выбор даты
    let mean_places_day_sql="select * from Parking_stand where time_from between datetime('"+req.query.date_from+"') and datetime('"+req.query.date_to+"') "
    if (req.query.parking!=undefined){
        mean_places_day_sql="select * from Parking_stand left join Space on Parking_stand.Space_id=Space.id left join Parking on Parking.id = Space.Parking_id where time_from between datetime('"+req.query.date_from+"') and datetime('"+req.query.date_to+"') and Parking.adress = '"+req.query.parking+"'";
        report_parking_stands_sql_by_date_difference = "select *, Cast ((JulianDay(time_to) - JulianDay(time_from)) * 24 As Integer) as difference from Parking_stand left join Car on Car.id = Parking_stand.Car_id left join Space on Parking_stand.Space_id = Space.id left join Parking on Space.Parking_id=Parking.id where time_from between datetime('"+req.query.date_from+"') and datetime('"+req.query.date_to+"') and Parking.adress='"+req.query.parking+"'";
    }
    let reportObject={
        'stands_count':0,
        'money':0,
        'mean_time':0, //среднее время стоянки в часах
        'mean_places':0 //средняя заполняемость мест за день в процентах
        
    }
    console.log(req.query)
    db.all(report_parking_stands_sql_by_date_difference,[], (err,rows)=>{
        park_time=[]
        rows.forEach(row => {
            park_time.push(row.difference);
            reportObject['money']+=parseInt(process.env.parking_cost);
            reportObject['stands_count']+=1;
        });
        reportObject['mean_time']=park_time.map(i=>x+=i, x=0).reverse()[0]/park_time.length
        console.log(reportObject)
        db.all(mean_places_day_sql,[],(err,rows)=>{
            console.log(rows.length)
            rows.forEach(row=>{
                reportObject['mean_places']+=1;
                console.log(reportObject['mean_places'])
            })
            if(req.query.parking){
                db.all('select count(*) as count from Space join Parking on Space.Parking_id = Parking.id where Parking.adress = (?)',[req.query.parking], (err,rows)=>{
                    reportObject['mean_places']=reportObject['mean_places']/rows[0].count;
                    res.status(200).json({message:'OK', reportObject})
                    return;
                })
            }
            else{
                db.all('select count(*) as count from Space join Parking on Space.Parking_id = Parking.id',[], (err,rows)=>{
                    reportObject['mean_places']=reportObject['mean_places']/rows[0].count;
                    console.log('111SUUULKA')
                    res.status(200).json({message:'OK', reportObject})
                    return;
                })
            }
            
        })
    })
    
    
})


module.exports = router;
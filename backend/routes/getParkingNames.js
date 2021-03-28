const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);
router.get('/', (req, res) => {
    let adresses = []
    db.all('select adress from Parking', [], (err, rows) => {
        if (rows.length < 1) { res.status(404).json({ message: 'No parkings' }) }
        else {
            rows.forEach((row, i, rows) => {
                adresses.push(row.adress);
            })
            res.status(200).json({ adresses: adresses })
        }
    })
})


module.exports = router;
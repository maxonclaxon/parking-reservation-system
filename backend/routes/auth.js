const express = require('express');
const router = express.Router()
var sqlite3 = require('sqlite3');
const argon = require('argon2') // Passwords hash
const jwt = require('jsonwebtoken')
require('dotenv/config');
var db = new sqlite3.Database(process.env.db_name);

router.post('/', (req, res) => {
    console.log('req.body:'+req.body)
    if (!req.body) { console.log('Body error'); res.sendStatus(400); }
    else {
        db.all("SELECT * FROM Profile where login=(?)", [req.body.login], (err, rows) => {
            if (!err) {
                if (rows.length > 0) {
                    argon.verify(rows[0].password, req.body.password).then(match => {
                        if (match) {
                            res.status(200).json({ login: req.body.login, token: jwt.sign({ login: req.body.login }, process.env.tokenKey) });
                        }
                        else {
                            res.status(200).json({ message: 'Ошибка входа' });
                        }
                    })
                }
                else { console.log('Error. Profile not found: '); res.status(200).json({ code: 1 }) }
            }
            else { console.log('Auth server error: ', err); res.status(404) }
        })
    }
})

module.exports = router;
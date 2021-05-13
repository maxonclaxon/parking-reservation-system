const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const argon = require('argon2') // Passwords hash
const jwt = require('jsonwebtoken')
const app = express()
var sqlite3 = require('sqlite3');
require('dotenv/config');


app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//routes
    //authentication
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);
    //registration
const registerRoute = require('./routes/register');
app.use('/api/register', registerRoute);
    //get profile cars
const getProfileCarsRoute = require('./routes/getProfileCars');
app.use('/api/authenticated/profile/getProfileCars', getProfileCarsRoute);
    //register profile car
const registerCar = require('./routes/registerCar');
app.use('/api/authenticated/profile/registerCar', registerCar);
    //get parking adresses
const getParkingAdresses = require('./routes/getParkingNames');
app.use('/api/authenticated/profile/getParkingAdresses', getParkingAdresses);
    //park car
const parkCar = require('./routes/parkCar');
app.use('/api/authenticated/parking/parkCar', parkCar);
    //profile info
const getProfileInfo=require('./routes/getProfileInfo');
app.use('/api/authenticated/profile/getInfo', getProfileInfo);



app.get('/', (req, res) => {
    res.send('Hello World!');
})



app.use('/api/authenticated', function (req, res, next) {
    if (!req.headers.authorization) return res.status(404).json({ message: 'Not authenticated' });
    else {
        jwt.verify(req.headers.authorization, process.env.tokenKey, (err, payload) => {
            if (!err) next();
            //else if(payload){
            //    if (payload.login === 'admin'){
            //        next() 
            //    }
            //}
            else res.status(404).json({ message: 'bad login', error: err, token: req.headers.authorization });
        })
    }
})






app.post('api/authenticated/registerParking')


app.listen(process.env.server_port, process.env.server_ip, () => {
    console.log('Server started ');
})
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const env = require('dotenv').config({path: './config/.env'});
const config = require('../config/config.js');


router.get('/', (req, res) =>{
    res.json({
        message: "welcome to the api"
    })
})

router.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, config.jwt.secret_key, (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.send({
                message: 'post created',
                authData
            })
        }
    });
})
function verifyToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];
    if(typeof(bearerHeader) !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken =  bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

router.post('/login', (req, res)=>{
  
    const user = {
        id: 1,
        username: 'mohsen',
        email: 'm.khashei@gmail.com'
    }


    jwt.sign({user}, config.jwt.secret_key, { expiresIn: config.jwt.expires_in }, (err, token) => {
        if(err) throw err
        res.json({
            token
        })
    });
})






module.exports = router;
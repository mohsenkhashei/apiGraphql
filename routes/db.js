const express = require('express');
const router = express.Router();
const env = require('dotenv').config({path: './config/.env'});
const config = require('../config/config.js');
const Hotel = require('../models/hotelsMongo');
const _ = require('lodash');
var fs = require('fs');


router.get('/', (req, res) =>{
    fs.readFile('./themes.json', function(err, data) {
        themes = JSON.parse(data);
    });
    fs.readFile('./facilities.json', function(err, dataa) {
        facilities = JSON.parse(dataa);
    });
    Hotel.find().then(hotel =>{
        hotel.forEach(function(row, key) { 
            if(row.themes[0].length > 0){
                var theme = row.themes[0];
                arrTheme = theme.split(",");
                var oneHotelTheme = [];
                arrTheme.forEach(function(arr){
                    let res = _.find(themes, { code: arr});
                    oneHotelTheme.push({title: res.name});
                })
               
            }
            var facility = row.facilities[0];
            arrFacility = facility.split(",");
            var oneHotelFacilities = [];
            arrFacility.forEach(function(value){
                let result = _.find(facilities, {code: value});
                oneHotelFacilities.push({title: result.name});
            })
            hotel[key].themes = oneHotelTheme;
            hotel[key].facilities = oneHotelFacilities;
            hotel[key].save().then(updatedFacility =>{
                console.log(key)
            })
        })
        console.log('done'); 
    })
 
   
})








module.exports = router;
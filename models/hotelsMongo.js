const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    name: String,
    star: String,
    country_code: String,
    country_name: String,
    code: String,
    destination : String ,
    destination_latitude : String ,
    destination_longitude : String ,
    region : String ,
    address : String ,
    latitude : String ,
    longitude : String ,
    nr_rooms : Number ,
    themes : Array ,
    facilities : Array  
})



module.exports = mongoose.model('Hotels', hotelSchema);
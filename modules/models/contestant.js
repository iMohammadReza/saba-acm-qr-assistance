const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContestantSchema = new Schema({
    name : { type : String , required : true},
    university : { type : String , required : true},
    phone : { type: String, required : true, unique : true},
    package : { type: Boolean, required : true, default: true},
    first_day_launch : { type: Boolean, required : true, default: true},
    second_day_launch : { type: Boolean, required : true, default: true}
});

module.exports = mongoose.model('Contestant' , ContestantSchema)
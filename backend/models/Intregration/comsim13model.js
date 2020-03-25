const mongoose = require('mongoose');

const comsim13 = mongoose.Schema({
    A:Number,
    B:Number,
    exp:String,
    result:Number,
    n:Number
})

module.exports = mongoose.model('comsim13',comsim13)
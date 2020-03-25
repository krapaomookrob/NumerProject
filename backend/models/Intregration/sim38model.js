const mongoose = require('mongoose');

const sim38 = mongoose.Schema({
    A:Number,
    B:Number,
    exp:String,
    result:Number,
    n:Number
})

module.exports = mongoose.model('sim38',sim38)
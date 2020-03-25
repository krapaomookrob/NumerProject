const mongoose = require('mongoose');

const sim13 = mongoose.Schema({
    A:Number,
    B:Number,
    exp:String,
    result:Number,
    n:Number
})

module.exports = mongoose.model('sim13',sim13)
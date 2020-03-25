const mongoose = require('mongoose');

const comtrap = mongoose.Schema({
    A:Number,
    B:Number,
    exp:String,
    result:Number,
    n:Number
})

module.exports = mongoose.model('comtrap',comtrap)
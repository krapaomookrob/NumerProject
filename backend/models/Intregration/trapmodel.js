const mongoose = require('mongoose');

const trap = mongoose.Schema({
    A:Number,
    B:Number,
    exp:String,
    result:Number
})

module.exports = mongoose.model('trap',trap)
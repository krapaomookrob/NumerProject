const mongoose = require('mongoose');

const One = mongoose.Schema({
    xnew:Number,
    equation:String,
    result:Array
})

module.exports = mongoose.model('Onepoint',One)
const mongoose = require('mongoose');

const One = mongoose.Schema({
    x0:Number,
    x1:Number,
    equation:String,
    result:Array
})

module.exports = mongoose.model('Secant',One)
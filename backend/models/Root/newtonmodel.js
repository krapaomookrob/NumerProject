const mongoose = require('mongoose');

const newton = mongoose.Schema({
    xnew:Number,
    equation:String,
    result:Array
})

module.exports = mongoose.model('Newton',newton)
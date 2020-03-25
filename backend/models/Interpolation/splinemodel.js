const mongoose = require('mongoose');

const spline = mongoose.Schema({
    x:Array,
    fx:Array,
    result:Number,
    xmark:Number
})

module.exports = mongoose.model('spline',spline)
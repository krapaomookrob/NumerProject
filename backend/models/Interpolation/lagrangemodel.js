const mongoose = require('mongoose');

const lagrange = mongoose.Schema({
    poly:Array,
    x:Number,
    resultL:Array,
    resultX:Number
})

module.exports = mongoose.model('lagrange',lagrange)
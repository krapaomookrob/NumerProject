const mongoose = require('mongoose');

const poly = mongoose.Schema({
    poly:Array,
    x:Number,
    result:Array
})

module.exports = mongoose.model('poly',poly)
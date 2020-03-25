const mongoose = require('mongoose');

const reg = mongoose.Schema({
    linear:Array,
    x:Number,
    result:Object,
    value:Number
})

module.exports = mongoose.model('reg',reg)
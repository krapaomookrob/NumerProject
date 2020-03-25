const mongoose = require('mongoose');

const heun = mongoose.Schema({
    startx:Number,
    endx:Number,
    y:Number,
    h:Number,
    exp:String,
    diff:String,
    result:Array,
})

module.exports = mongoose.model('heun',heun)
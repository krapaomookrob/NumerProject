const mongoose = require('mongoose');

const euler = mongoose.Schema({
    startx:Number,
    endx:Number,
    y:Number,
    h:Number,
    exp:String,
    diff:String,
    result:Array
})

module.exports = mongoose.model('euler',euler)
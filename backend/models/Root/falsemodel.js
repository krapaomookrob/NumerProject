const mongoose = require('mongoose');

const False = mongoose.Schema({
    xl:Number,
    xr:Number,
    equation:String,
    result:Array
})

module.exports = mongoose.model('FalsePostion',False)
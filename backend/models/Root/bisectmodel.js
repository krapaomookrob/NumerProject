const mongoose = require('mongoose');

const BisectSchema = mongoose.Schema({
    xl:Number,
    xr:Number,
    equation:String,
    result:Array
})

module.exports = mongoose.model('Bisection',BisectSchema)
const mongoose = require('mongoose');

const fw = mongoose.Schema({
    x:Number,
    h:Number,
    exp:String,
    ans:Object
})

module.exports = mongoose.model('fw',fw)
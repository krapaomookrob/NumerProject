const mongoose = require('mongoose');

const fwoh2 = mongoose.Schema({
    x:Number,
    h:Number,
    exp:String,
    ans:Object
})

module.exports = mongoose.model('fwoh2',fwoh2)
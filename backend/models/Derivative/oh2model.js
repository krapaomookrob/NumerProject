const mongoose = require('mongoose');

const oh2 = mongoose.Schema({
    x:Number,
    h:Number,
    exp:String,
    ans:Object
})

module.exports = mongoose.model('oh2',oh2)
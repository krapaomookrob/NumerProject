const mongoose = require('mongoose');

const oh4 = mongoose.Schema({
    x:Number,
    h:Number,
    exp:String,
    ans:Object
})

module.exports = mongoose.model('oh4',oh4)
const mongoose = require('mongoose');

const bw = mongoose.Schema({
    x:Number,
    h:Number,
    exp:String,
    ans:Object
})

module.exports = mongoose.model('bw',bw)
const mongoose = require('mongoose');

const bwoh2 = mongoose.Schema({
    x:Number,
    h:Number,
    exp:String,
    ans:Object
})

module.exports = mongoose.model('bwoh2',bwoh2)
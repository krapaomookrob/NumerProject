const mongoose = require('mongoose');

const lu = mongoose.Schema({
    matrixA:Array,
    matrixB:Array,
    result:Array,
    L:Array,
    U:Array,
    size:Number
})

module.exports = mongoose.model('lu',lu)
const mongoose = require('mongoose');

const conju = mongoose.Schema({
    matrixA:Array,
    matrixB:Array,
    result:Array,
    size:Number,
    initmatrix:Array,
    iteration:Array,
    x:Array,
    err:Array
})

module.exports = mongoose.model('conju',conju)
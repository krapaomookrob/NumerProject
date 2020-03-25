const mongoose = require('mongoose');

const jacobi = mongoose.Schema({
    matrixA:Array,
    matrixB:Array,
    result:Array,
    size:Number,
    initmatrix:Array,
    iteration:Array,
    x:Array,
    xerr:Array
})

module.exports = mongoose.model('jacobi',jacobi)
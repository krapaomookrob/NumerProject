const mongoose = require('mongoose');

const seidel = mongoose.Schema({
    matrixA:Array,
    matrixB:Array,
    result:Array,
    size:Number,
    initmatrix:Array,
    iteration:Array,
    x:Array,
    err:Array
})

module.exports = mongoose.model('seidel',seidel)
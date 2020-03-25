const mongoose = require('mongoose');

const invert = mongoose.Schema({
    matrixA:Array,
    matrixB:Array,
    result:Array,
})

module.exports = mongoose.model('invert',invert)
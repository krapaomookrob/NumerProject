const mongoose = require('mongoose');

const Gausseli = mongoose.Schema({
    matrixA:Array,
    matrixB:Array,
    result:Array,
})

module.exports = mongoose.model('gausseli',Gausseli)
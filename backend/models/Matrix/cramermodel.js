const mongoose = require('mongoose');

const Cramer = mongoose.Schema({
    matrixA:Array,
    matrixB:Array,
    result:Array,
})

module.exports = mongoose.model('Cramer',Cramer)
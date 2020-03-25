const mongoose = require('mongoose');

const chol = mongoose.Schema({
    matrixA:Array,
    result:Array,
})

module.exports = mongoose.model('chol',chol)
const mongoose = require('mongoose');

const jordan = mongoose.Schema({
    matrixgordan:Array,
    result:Array,
})

module.exports = mongoose.model('jordan',jordan)
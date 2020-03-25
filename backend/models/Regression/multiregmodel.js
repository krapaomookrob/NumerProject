const mongoose = require('mongoose');

const multi = mongoose.Schema({
    poly:Array,
    result:Object
})

module.exports = mongoose.model('multireg',multi)
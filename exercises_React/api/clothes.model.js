const mongoose = require('mongoose') 

const Clothes = mongoose.model('Clothes', {
    name: {type: String, required: true, minLength: 5},
    type: {type: String, required: true, minLength: 3},
})

module.exports = Clothes
const mongoose = require('mongoose') 

const Clothes = mongoose.model('Clothes', {
    name: {type: String, required: true, minLength: 5, maxLength: 20},
    type: {type: String, required: true, minLength: 3, maxLength: 10},
})

module.exports = Clothes
const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
    name: {type: String, required: true},
    img: String,
    price: {type: Number, required: true},
    description: {type: String, required: true}
},
{timestamps: true})

const Phones = mongoose.model('Phones', phoneSchema)

module.exports = Phones
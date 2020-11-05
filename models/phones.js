const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
    name: {type: String, required: true},
    img: String,
    price: {type: Number, required: true},
  
        launched: {type: String, required: true},
        display: {type: String, required: true},
        memory: {type: String, required: true},
        camera: {type: String, require: true},

   
},
{timestamps: true})

const Phones = mongoose.model('Phones', phoneSchema)

module.exports = Phones
// Dependencies
const express = require('express')
const phones = express.Router()
// Models
const Phones = require('../models/phones')

// json Route
phones.get('/json', async (req, res) => {
    try {
      const phones = await Phones.find()
      res.send(phones)
    } catch (err) {
      res.send(err.message)
    }
  })
///////////
//  Routes
//////////////
  phones.get('/', async (req, res) => {
    try {
      const phones = await Phone.find().sort({ name: 1 })
      if (!phones.length) { res.send('waiting for database to be seeded <a href="/products/seed/newproducts">go here</a>') }
      res.render('./phones/index.ejs', { phones })
    } catch (err) {
      res.send(err.message)
    }
  })

  // New Route
  phone.get('/new', (req, res) => {
    res.render('./phones/new.ejs')
  })

  // Show Route
phones.get('/:id', async (req, res) => {
    try {
      const phone = await Phone.findById(req.params.id)
      res.render('./phones/show.ejs', { phone: phone })
    } catch (err) {
      res.send('That isn\'t a valid id! <a href="/phoness">Go back</a>')
    }
  })

  // Create Route
phones.post('/', async (req, res) => {
    try {
      const phone = await Phone.create(req.body)
      res.redirect('/phones/' + phone.id)
    } catch (err) {
      res.send(err.message)
    }
  })

  // Edit Route
phones.get('/:id/edit', async (req, res) => {
    try {
      const phone = await Phone.findById(req.params.id)
      res.render('./phones/edit.ejs', { phone: phone })
    } catch (err) {
      res.send(err.message)
    }
  })

  // Update : PUT    '/products/:id'      6/7
phones.put('/:id', async (req, res) => {
    try {
      const phone = await Phone.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.redirect('/phones/' + phone.id)
    } catch (err) {
      res.send(err.message)
    }
  })

  // Delete : DELETE '/products/:id'      7/7
phones.delete('/:id', async (req, res) => {
    try {
      await Phone.findByIdAndRemove(req.params.id)
      res.redirect('/phones')
    } catch (err) {
      res.send(err.message)
    }
  })

  module.exports = phones
  
  
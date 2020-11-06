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
// index
  phones.get('/', async (req, res) => {
    try {
      const phones = await Phones.find()
      console.log(phones)
      res.render('../views/index.ejs', { phones })
    } catch (err) {
      res.send(err.message)
    }
  })
  ///////
  // New Route
  //////////
  phones.get('/new', (req, res) => {
    res.render('../views/new.ejs')
  })
  //////
  // Show Route
  /////////
phones.get('/:id', async (req, res) => {
    try {
      const phone = await Phones.findById(req.params.id)
      res.render('../views/show.ejs', { phone: phone })
    } catch (err) {
      res.send('That isn\'t a valid id! <a href="/phones">Go back</a>')
    }
  })
  ////////
  // Create Route
  //////////
phones.post('/', async (req, res) => {
    try {
      const phone = await Phones.create(req.body)
      res.redirect('/phones/' + phone.id)
    } catch (err) {
      res.send(err.message)
    }
  })
  ////////
  // Edit Route
  //////////
phones.get('/:id/edit', async (req, res) => {
    try {
      const phone = await Phones.findById(req.params.id)
      res.render('../views/edit.ejs', { phone: phone })
    } catch (err) {
      res.send(err.message)
    }
  })
  //////
  // Update
  ///////// 
phones.put('/:id', async (req, res) => {
    try {
      const phone = await Phones.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.redirect('/phones/' + phone.id)
    } catch (err) {
      res.send(err.message)
    }
  })
  //////
  // Delete
  ////////
phones.delete('/:id', async (req, res) => {
    try {
      await Phones.findByIdAndRemove(req.params.id)
      res.redirect('/phones')
    } catch (err) {
      res.send(err.message)
    }
  })

  module.exports = phones
  
  
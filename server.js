////////
//Dependencies
////
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
//////////
//Port
////
// ports that can be used.
const PORT = process.env.PORT || 3000;

////////
//Database
////
// connection to database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+`mockdb`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{
  console.log("connected to mongo")
});

/////////
//Middleware
/////

// use public folder for CSS styling
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns information as a json object

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
const Phones = require('./models/phones.js')

//___________________
// Routes
//___________________
// Index Route
app. get('/phones', (req, res) => {
  Phones.find({}, (error, allPhones) => {
    console.log(allPhones)
    res.render('index.ejs', {
      phones: allPhones
    })
  })
})


// New Route // this route links to my new.ejs file, which is am html boilerplat.
// with inputs for the name, img, descrpition and the price of the new product i want.
// to add to my page
app.get('/phones/new', (req, res) => {
  res.render('new.ejs');
});

// show
app.get('/phones/:id', (req, res) => {
  Phones.findById(req.params.id, (error, foundPhone) => {
      res.render('show.ejs', {
          phone: foundPhone
          
      })
  })
})

// edit
app.get('/phones/:id/edit', (req, res) =>{
  Phones.findById(req.params.id, (error, foundPhone) =>{
      if (error) {
          console.log(error)
      }
      console.log(foundPhone)
      res.render('edit.ejs', {
          phone: foundPhone
          
      })
  })
})

// Create Route
app.post('/phones', (req, res) => {
  // console.log(req.body)
  Phones.create(req.body, (error, createdPhone) => {
    if(error) {
      console.log(error)
    }else {res.redirect('/phones')}
  })
})

// update
app.put('/phones/:id', (req, res)=> {
  Phones.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
    console.log(req.body)
      if (error) {
          console.log(error)
      }
      res.redirect('/phones')
  })
})

// delete
app.delete('/phones/:id', (req, res) => {
  Phones.findByIdAndRemove(req.params.id, {userFindAndModify: false}, (error, data) => {
    res.redirect('/phones')
  })
})


//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
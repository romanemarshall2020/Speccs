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
const PORT = process.env.PORT || 3000;

////////
//Database
////
const MongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mockdb';

// Connect to Mongo
mongoose.connect(MongoURI ,  { useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false },
  () => console.log('MongoDB connection established:', MongoURI)
  );

// connection messages
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));

// controllers
const phonesController = require('./controllers/phones')


/////////
//Middleware
////
// use public folder for CSS styling
app.use(express.static('public'));

// populates req.body with parsed info from forms 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());// returns information as an object

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use('/phones', phonesController)

//localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/phones');
});
///////////////
// listener
/////////
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
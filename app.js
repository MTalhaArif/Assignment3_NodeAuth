const express = require('express');
const mongoose = require('mongoose');
const authRoutes= require('./routes/authRoutes');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const app = express();

const cookieParser = require('cookie-parser');


// middleware
app.use(express.static('public'));
app.use(express.json());

app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://talhaarif31:test1234@cluster0.pysqe.mongodb.net/smootheeShop?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    
    app.listen(3000)
    console.log('listening to port 3000 ');
  })
  .catch((err) => console.log(err));

// routes

app.get('*', checkUser);
app.get('/',  (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes);

//cookies
// app.get('/set-cookies', (req, res)=>
// {

  //res.setHeader('Set-cookie', 'newUser=true');

  //install cookie parser for easier setting of cookies
//   res.cookie('newUser' , false);
//   res.cookie('isemployee' , true , {maxAge : 1000 * 60 * 60 * 24 , secure : true}); //secure gets connection only over a secure network e.g https

//   res.send('the cookies are here !');

// })

// app.get('/read-cookies', (req, res)=>
// {

//   const cookies = req.cookies;
//   console.log(cookies);

//   res.json(cookies);

// })
'use strict'
import express from 'express';
//import * as data from './data.js';
import { Fruits } from "./models/Fruit.js";
import cors from 'cors';




//import * as http from 'http';
//import * as querystring from 'querystring';
//const querystring = require('node:querystring');
console.log("1 - Program Start");

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/api', cors()); // set Access-Control-Allow-Origin header for api route
app.use(express.json()); //Used to parse JSON bodies

//hw4
app.get('/api/fruits', (req,res) => {
  Fruits.find({}).lean()
    .then((fruits) => {
      res.json(fruits);
    })
    .catch(err =>  {
      res.status(500).send('Database Error occurred');
    })
});

app.get('/api/fruits/:id', (req,res) => {
    Fruits.findOne({ name:req.params.id }).lean()
        .then((fruits) => {
           res.json(fruits);
        })
        .catch(err => {
            res.status(500).send('Database Error occurred');
        });
});

app.post('/api/fruits', (req, res) => {
  const { name, color, calories, origin, taste } = req.body;

  Fruits.findOneAndUpdate(
    { name: name },
    { color: color, calories: calories, origin: origin, taste: taste },
    { upsert: true, new: true }
  )
    .lean()
    .then((fruit) => {
      res.json(fruit);
    })
    .catch((err) => {
      res.status(500).send('Database Error occurred');
    });
});

app.delete('/api/fruits/:id', (req, res) => {
  Fruits.findOneAndDelete({ name: req.params.id })
    .lean()
    .then((fruit) => {
      if (fruit) {
        res.json({ message: 'Fruit deleted successfully' });
      } else {
        res.status(404).json({ message: 'Fruit not found' });
      }
    })
    .catch((err) => {
      res.status(500).send('Database Error occurred');
    });
});

//hw3
app.get('/',(req, res, next) => {
  Fruits.find({}).lean()
    .then((fruits) => {
      res.render('home',{ fruits });
  })
    .catch(err => next(err))
});

app.get('/fruit/:id', (req, res, next) => {
  const id = req.params.id;
  Fruits.findOne({ name: id }).lean()
    .then((fruit) => {
      res.render('detail', { fruit });
    })
    .catch(err => next(err));
});


/*
// define some routes
const fruits = data.getAll();
app.get('/', (req,res) => {
  res.render('home', {fruits});
});

//console.log(data.getAll());

app.get('/fruit/:id', (req, res) => {
  const id = req.params.id;
  const fruit = fruits.find((fruit) => fruit.name === id);


app.get('/about', (req,res) => {
  res.sendFile('/public/about.html');
});
*/

app.use((req,res) => {
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
  console.log('Express started'); 
});

//fs.readFile('package.json', doneReading);
 /*
http.createServer((req,res) => {
  let url = req.url.split("?");
  let query =  querystring.parse(url[1]);
  console.log(query)
  let path = url[0].toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            let fruits = data.getAll();
            console.log(fruits);
            res.end(`Home page for ${fruits.length} fruits`);
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('My name is John, nice to meet you!');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
    }
}).listen(process.env.PORT || 3000);
*/
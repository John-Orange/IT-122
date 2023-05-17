'use strict'
import express from 'express';
//import * as data from './data.js';
import { Fruits } from "./models/Fruit.js";


//import * as http from 'http';
//import * as querystring from 'querystring';
//const querystring = require('node:querystring');
console.log("1 - Program Start");

function getAllFruits() {
  return Fruits.find({}).lean()
    .then((fruits) => {
      return fruits;
    })
    .catch((err) => {
      throw err;
    });
}

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  getAllFruits()
    .then((fruits) => {
      res.render('home', { fruits });
    })
    .catch((err) => {
      res.status(500).send('Error');
    });
});

app.get('/fruit/:id', (req, res) => {
  const id = req.params.id;

  Fruits.findOne({ name: id }).lean()
    .then((fruit) => {
        res.render('detail', { fruit });
    })
    .catch((err) => {
      res.status(500).send('Error');
    });
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
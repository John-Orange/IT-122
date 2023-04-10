const fs = require("fs");
const http = require("http"); 
const querystring = require('node:querystring');

const doneReading = (err,data) => {
  if (err) console.error(err);
  console.log('2 - done reading file');
  console.log(data.toString());
}

console.log("1 - Program Start");

fs.readFile('package.json', doneReading);
 
http.createServer((req,res) => {
  let url = req.url.split("?");
  let query =  querystring.parse(url[1]);
  console.log(query)
  let path = url[0].toLowerCase();
    switch(path) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`Home page for ${query.name}`);
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
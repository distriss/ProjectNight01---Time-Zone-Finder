const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const timezones = {
  "london": "GMT + 1",
  "glasgow": "GMT + 1",
  "los angeles": "GMT - 7",
  "madrid": "GMT + 2",
  "new york": "GMT - 4",
  "podgorica": "GMT + 2",
  "helsinki": "GMT + 3",
  "bern": "GMT + 1",
  "chicago": "GMT - 5",
  "denver": "GMT - 6",
  "rome": "GMT + 2",
  "zagreb": "GMT + 2",
  "toronto": "GMT - 4",
  "tokyo": "GMT + 9",
  "lund": "GMT + 2",
  "sydney": "GMT + 10",
  "stockholm": "GMT + 2",
  "cape town": "GMT + 2",
  "beijing": "GMT + 8",
  "dublin": "GMT + 1",
  "brussels": "GMT + 1",
  "copenhagen": "GMT + 2",
  "berlin": "GMT + 2",
  "oslo": "GMT + 2",
  "riga": "GMT + 3",
  "tallinn": "GMT + 3",
  "osaka": "GMT + 9",
  "san francisco": "GMT - 7",
  "las vegas": "GMT - 7",
  "chicago": "GMT - 5",
  "santiago": "GMT - 4",
  "buenos aires": "GMT - 3",
  "rio de janeiro": "GMT - 3",
  "cairo": "GMT + 2",
  "hong kong": "GMT + 8",
  "paris": "GMT + 2",
  "seattle": "GMT - 7",
  "anchorage": "GMT - 8",
  "seoul": "GMT + 9",
  "busan": "GMT + 9",
  "taipei": "GMT + 8",
  "hanoi": "GMT + 7",
  "bangkok": "GMT + 7",
}


const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if ('city' in params) {
      if (timezones[params['city']]) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const objToJson = {
          timezone: timezones[params['city']]
        }
        res.end(JSON.stringify(objToJson));
      }// Found city
      else if (!timezones[params['city']]) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const objToJson = {
          timezone: 'Unknown'
        }
        res.end(JSON.stringify(objToJson));
      }// Couldn't find city
    }// Missing city parameter
  }// end of /api
     
     else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });

       // tried to add background image, this is not the way ¯\(°_o)/¯
       // Added one way to do it - Joppest
     } else if (page == '/img/world-image.png') {
   var s = fs.createReadStream('./img/world-image.png');
    s.on('open', function () {
        res.setHeader('Content-Type', 'image/png');
        s.pipe(res);
    })          
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  
    
  } else {
    figlet('404!!', function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);

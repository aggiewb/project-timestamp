// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// listen for requests
var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', (req, res) => {
  res.json({greeting: 'hello API'});
});

//? indicates optional string pattern
app.get('/api/timestamp/:date_string?', (req, res) => {
  const dateString = req.params.date_string;
  const validDate = new Date();

  if(!dateString){
    const currentDate = new Date();
    res.json({'unix': currentDate.getTime(), 'utc': currentDate.toUTCString()});
  } else if(!isNaN(dateString)){
    const validDate = new Date(parseInt(dateString));
    res.json({'unix': validDate.getTime(), 'utc': validDate.toUTCString()});
  } 
});
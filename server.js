// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const INVALID_DATE_STRING = 'Invalid Date';
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
  let date;

  if(!dateString){
    date = new Date();
  } else {
    date = new Date(isNaN(dateString) ? dateString : parseInt(dateString));
  }

  if(date.toString() === INVALID_DATE_STRING){
    return res.json({error: INVALID_DATE_STRING});
  }
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});
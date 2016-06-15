var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Init express
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Setup body parser
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
  extended: true
}));

// Create candy array
var candyId = 5;
var candies = [{"id":1,"name":"Chewing Gum","color":"Red"},
               {"id":2,"name":"Pez","color":"Green"},
               {"id":3,"name":"Marshmallow","color":"Pink"},
               {"id":4,"name":"Candy Stick","color":"Blue"}];

/*
 *  Front end
 */

app.get('/', function(req,res){
  res.render('index', { title: 'Candy Web App' });
});

/*
 *  API
 */

// Index
app.get('/api', function(req,res){
  res.json(candies);
});

// Show
app.get('/api/:id', function(req,res){

  // Remember filter returns an array.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  var candy = candies.filter(function(element){
    return element["id"] == req.params.id;
  })[0];

  // Return the found candy if it exists else {};
  res.json(candy);
});

// Create
app.post('/api/',function(req, res) {

  // Add the new candy to the array
  req.body.id = candyId;
  candyId++;
  candies.push(req.body);

  // Return the created candy
  res.json(req.body);
});

// Update
app.put('/api/:id/edit', function(req, res){

  // Find the candy in the array
  for (var i in candies) {
    if (candies[i]["id"] == req.params.id) {
      // Update the found candy
      candies[i] = req.body;
    }
  }

  // Return the updated candy
  res.json(req.body);
});

// Destroy
app.delete('/api/:id', function (req, res) {

  // Find candy in array
  for(var i in candies){
    if(candies[i]["id"] == req.params.id){
      // Delete the found candy
      delete candies[i];
    }
  }

  // Return a deleted message
  res.json({message : 'deleted' });
});

// Listen on port 3000
app.listen(3000, function(){
  console.log('listning on port 3000');
});

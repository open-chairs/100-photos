require('newrelic');
const express = require('express');
const path = require('path');
const parser = require('body-parser');
const mongo = require('../database/mongoIndex.js');
const cors = require('cors');
var db;
var PORT = 3002;
var app = express();

app.use(cors())

app.use(parser.json());
app.use(express.static('./client/dist'));

app.get('/photos/:restaurantId', function (req, res) {

  var id = Number(req.params.restaurantId); 

  getPhotosById(id, (error, data) => {
    if(error) {
      console.log(error);
      res.status(500).send(error);
    }
    console.log(data)
    res.status(200).send(JSON.parse(data[0].img));
  });
})

app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'))
})

mongo.connectToServer( function(err, client) {
  if(err) {
    console.log(err)
  } else {
    db = mongo.getDB();
    console.log('connected to MongoDB')};
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`)
    })
})

//*********************** MODEL ****************************

const getPhotosById = (id, callback) => {
  db.collection('photos').find({restaurant_id:id}).toArray(callback)
}
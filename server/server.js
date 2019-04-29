const express = require('express');
const path = require('path');
const morgan = require('morgan');
const parser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors');

var PORT = 3002;
var app = express();

app.use(morgan('dev'));
app.use(parser.json());
app.use(cors());

app.use(express.static('./client/dist'));

app.get('/photos/:restaurantId', function (req, res) {

  var id = Number(req.params.restaurantId); 

  getPhotosById(id, (error, data) => {
    if(error) {
      console.log(error);
      res.status(500).send(error);
    }
    res.status(200).send(JSON.parse(data[0].img));
  });
})

app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})


//*********************** MODEL ****************************

const getPhotosById = (id, callback) => {
  db.getRestaurantPhoto(id,callback)
}

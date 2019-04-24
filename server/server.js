const express = require('express');
const path = require('path');
const morgan = require('morgan');
const parser = require('body-parser');
const cors = require('cors');
const SqlString = require('sqlstring');
const db = require('../database/index.js');


const PORT = 3002;
const app = express();

db.connect();

app.use(morgan('dev'));
app.use(parser.json());
app.use(cors());

app.use(express.static('./client/dist'));

app.get('/photos/:restaurantId', function (req, res){

  const id = Number(req.params.restaurantId); 

  getPhotosById(id, (error, data) => {
    if(error) {
      console.log(error);
      return;
    }
    console.log(data);
    res.set('font-src','none')
    res.status(200).send(data);
  });
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})


//*********************** MODEL ****************************

const getPhotosById = (id, callback) => {
  var escapedId = SqlString.escape(id);
  db.query(`SELECT * FROM photos WHERE restaurant_id = ${escapedId};`, (err, photos) => {
    if(err){
      callback(err);
      return; 
    } 
    callback(null, photos)
});
};

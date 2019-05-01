// const mysql = require('mysql');

// module.exports = mysql.createConnection({
//   user: "root",
//   password: "",
//   database: "gallery"
// });

const mongoos = require('mongoose');
mongoos.connect('mongodb://localhost:27017/sdc100photostest',{ useNewUrlParser: true });
const db = mongoos.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to database')
});

const photoShema = new mongoos.Schema({
  restautant_id: Number,
  img: Array,
});

const PhotosCollections = mongoos.model('PhotosCollections', photoShema,'photostest');
// PhotosCollections.find({restautant_id:489478}).exec(cb)

const getRestaurantPhoto = (resId,cb) => {
  PhotosCollections.find({restautant_id:resId}).exec(cb)
}

module.exports.getRestaurantPhoto = getRestaurantPhoto;

// getRestaurantPhoto(5,(err,input)=>(console.log(err,input)))


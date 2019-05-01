const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";

var _db

module.exports = {
    connectToServer: function( cb ) {
        MongoClient.connect(url,{useNewUrlParser:true},function(err,client) {
            _db = client.db('sdc100photostest');
            return cb(err);
        })
    },
    getDB: function() {
        return _db;
    }
};
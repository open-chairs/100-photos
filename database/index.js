const mysql = require('mysql');

module.exports = mysql.createConnection({
  user: "root",
  password: "",
  database: "gallery"
});

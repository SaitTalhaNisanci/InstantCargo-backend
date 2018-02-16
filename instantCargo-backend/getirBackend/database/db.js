var MongoClient = require('mongodb').MongoClient;
var connectionUrl = "mongodb://localhost:27017/";
var defaultLogger = require('../logging/defaultLogger');
var log = new defaultLogger();
/*
Connect to the database with the given url.
If database does not exit it will be created.
*/
MongoClient.connect(connectionUrl, function(err, db) {
  if (err) {
    log.err(err);  
    throw err;
  }
  log.info("Database created!");
});
var MongoClient = require('mongodb').MongoClient;
var connectionUrl = "mongodb://heroku_sn4pp7mh:b7j0q7h9mkacnh7ce2c6icmpnd@ds239648.mlab.com:39648/heroku_sn4pp7mh";
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
  log.info("Connected to database!");
});
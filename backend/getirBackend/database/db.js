var MongoClient = require('mongodb').MongoClient;
var connectionUrl = "mongodb://localhost:27017/mydb";


/*
Connect to the database with the given url.
If database does not exit it will be created.
*/
MongoClient.connect(connectionUrl, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
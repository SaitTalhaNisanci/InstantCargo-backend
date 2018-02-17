var mongoose = require('mongoose');
var connectionUrl = require('config').DBHost;
var defaultLogger = require('../logging/defaultLogger');
var log = new defaultLogger();

// a function to connect to the given databaseUrl asyncly.
function connectToDatabase(databaseUrl){
  return new Promise(function(resolve,reject){
      mongoose.connect(databaseUrl,function(err,database){
        if(err){
          log.err(err);
          reject(err);
        }else {
          log.info("Connected to database!");
          resolve(database);
        }
      });
  });
};
connectToDatabase(connectionUrl)
.then(function(database){    
  
})
.catch(function(err){
  console.log(err);
});
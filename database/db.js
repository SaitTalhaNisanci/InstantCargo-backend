var mongoose = require('mongoose');
var connectionUrl = "mongodb://heroku_sn4pp7mh:b7j0q7h9mkacnh7ce2c6icmpnd@ds239648.mlab.com:39648/heroku_sn4pp7mh";
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
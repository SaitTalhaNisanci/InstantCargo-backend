var express = require('express');
  router = express.Router(),
  userModel = require('../models/user'),
  defaultLogger = require('../logging/defaultLogger'),
  log = new defaultLogger(),
  prettyJSON = require('../common/util');

/*
 * addUser is an async function to create a user
 * with the given userData.
 */  
var addUser = (userData) => {
  return new Promise( (resolve,reject) =>{
    userModel.create(userData,(err,res) => {
      if (err) {
          log.err(err);
          reject(err);
      }else {
          log.info("a new user is successfully created: ");
          resolve(res);
      }
   });
  });
}; 
/* POST create a new user.
 * user data:
 *  {
 *     username : string 
 *  }
 */
router.post('/create', (req,res) => {
  var userData = {
    username:req.body.username,
  };
  addUser(userData)
    .then( (result) => {
        res.status(201).send(result);
    })
    .catch( (err) =>{
        res.status(400).send(err);
    });
  });

module.exports = router;

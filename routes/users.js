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

/*
 * updateLocation is an async function to update a user
 * with the given update data.
 * condition data:
 * { username: req.body.username }
 * update data:
 * {
 *  location : {
 *    type: req.body.type,
 *    coordinates: [
 *      req.body.latitude, req.body.longitude
 *    ]
 *  }
 * }
 */  
var updateLocation = (conditions,update,options) => {
  return new Promise((resolve,reject) => {
    userModel.findOneAndUpdate(conditions,update, options,(err,doc) => {
      if (!err && doc){
        log.info("User location is successully updated");
        resolve(doc);
      }else {
        log.err(err);
        reject(err);
      }
    })
  })
}

/* PUT update an existing user.
 * 'username' has to be provided as validation.
 *  a nonexisting username will result in 400 response.
 *  a valid update data has the following form:
 *  {
 *	 "username":"heisenberg1",
 *   "longitude": 10,
 *	 "latitude":20,
 *	 "type":"Point"
 *   }
 */
router.put('/updateLocation',(req,res) => {
  var conditions = {
    username: req.body.username,
  }
  var update = {
    location : {
      type: req.body.type,
      coordinates: [
        req.body.latitude, req.body.longitude
      ]
    }
  }
  var options = {new: true, upsert: true};
  updateLocation(conditions,update)
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      log.err(err);
      res.status(400).send(err);
    })
})

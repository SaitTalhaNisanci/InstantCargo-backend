var express = require('express');
  router = express.Router(),
  userModel = require('../models/user'),
  defaultLogger = require('../logging/defaultLogger'),
  log = new defaultLogger(),
  prettyJSON = require('../common/util'),
  logMessages = require('../common/constants').logMessages;

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
          log.info(logMessages.userCreated);
          resolve(res);
      }
   });
  });
}; 
  /**
 * @api {post} /user/create Create a New User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} username Username of the User
 * @apiSuccess {String} username Username of the User
 * @apiError {String} err Cause of the error
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
        log.info(logMessages.locationSuccessfullyUpdated);
        resolve(doc);
      }else {
        log.err(err);
        reject(err);
      }
    })
  })
}


  /**
 * @api {put} /user/updateLocation Update User Location
 * @apiName UpdateLocation
 * @apiGroup User
 *
 * @apiParam {String} username Username of the User
 * @apiParam {Number} longitude Longitude of the User's location
 * @apiParam {Number} latitude latitude of the User's location
 * @apiParam {String} type Type of the location.
 * @apiSuccess {String} username Username of the User
 * @apiSuccess {Location} location updated location of the User
 * @apiError {String} err Cause of the error
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

var express = require('express'),
    router = express.Router(),
    requestModel = require('../models/request'),
    defaultLogger = require('../logging/defaultLogger'),
    log = new defaultLogger(),
    prettyJSON = require('../common/util');

/*
 * addRequest is an async function to add a request to request model
 * with the given requestData.
 */
var addRequest = (requestData) => {
    return new Promise( (resolve,reject) => { 
        requestModel.create(requestData,(err,res) => {
            if (err) {
                log.err(err);
                reject(err);
            }else {
                log.info("a new request is successfully added: ", prettyJSON(requestData));
                resolve(res);
            }
        });
    });
}
/* POST a new request.
 * request data:
 * {
 *   name: string (name of the item)
 *   destination: string (destination for the item)
 *   source: string (source for the item)
 *   user: id (the user who made the request)
 * }
 */
router.post('/create', (req,res) => {
  var requestData = {
      name:req.body.name,
      destination: req.body.destination,
      source:req.body.source,
      user:req.body.user,
  }
  addRequest(requestData)
    .then( (result) => {
        res.status(201).send(result);
    })
    .catch( (err) =>{
        res.status(400).send(err);
    })

});

module.exports = router;
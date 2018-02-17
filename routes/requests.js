var express = require('express'),
    router = express.Router(),
    requestModel = require('../models/request'),
    defaultLogger = require('../logging/defaultLogger'),
    log = new defaultLogger(),
    prettyJSON = require('../common/util');

/*
 addRequest is an async function to add a request to request model
 with the given requestData.
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
request data:
{
    name: name of the item
    destination: destination for the item
    source: source for the item
    user: the user who made the request
}
*/
router.post('/', (req,res) => {
  var requestData = {
      name:req.body.name,
      destination: req.body.destination,
      source:req.body.source,
      user:req.body.user,
  }
  addRequest(requestData)
    .then( (res) => {
        res.status(200).send(res);
    })
    .catch( (err) =>{
        res.status(400).send(err);
    })

});

module.exports = router;
var express = require('express'),
    router = express.Router(),
    requestModel = require('../models/request'),
    defaultLogger = require('../logging/defaultLogger'),
    log = new defaultLogger(),
    prettyJSON = require('../common/util'),
    km = require('../common/constants').km;
    

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


/*
 * getAll is an async function to get all requests 
 * from request collection.
 * getAllData has the following form:
 *  {
 *      latitude: Number,
 *      longitude: Number,
 *      distance: Number 
 *  }
 * 
 */
var getAll = (getAllData)=>{
    return new Promise((resolve,reject)=>{
        var result = requestModel.find(
            {
                'destination':
                    { 
                        $near: {
                            type: "Point" ,
                            coordinates: [ lat , long ]
                       },
                        $maxDistance : distance*km
                    }
            }
    
        ).then(result => {
            resolve(obj);
        })
        .catch(err => {
            log.err(err);
            reject(err);
        });
    })
}
/*
 * POST to get all requests in the range of 'distance'
 * getAllData:
 *  {
 *      latitude: Number,
 *      longitude: Number,
 *      distance: Number 
 *  }
 */
router.post('/getAll',(req,res) => {
    // Grab all of the query parameters from the body.
    let getAllData = {
        lat :req.body.latitude,
        long : req.body.longitude,
        distance : req.body.distance
    }; 
    getAll(getAllData)
        .then(result =>{
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(400).send(err);
        })
})
module.exports = router;
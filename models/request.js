
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    collectionNames = require('../common/constants').collectionNames;
/*
    name: name of the object to be delivered
    destination: destination is where the object will be delivered to
    source: source is where the object will be taken from
    user: user is who created the request.
    created_at: the creation time of the request
*/
var requestSchema = new Schema(
    {
        name:String,
        destination: { type: {type:String}, coordinates: [Number]},
        source:{ type: {type:String}, coordinates: [Number]},
        user:{type:Schema.Types.ObjectId,ref :collectionNames.user},
        created_at: {type: Date, default: Date.now}
    }
);
// Add index to destination and source to get nearby locations.
requestSchema.index({destination:'2dsphere'});
requestSchema.index({source:'2dsphere'});

mongoose.model(collectionNames.request,requestSchema,collectionNames.request);
module.exports = mongoose.model(collectionNames.request);
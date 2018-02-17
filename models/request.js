
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    collectionNames = require('../common/constants').collectionNames;
/*
    id: id of the request
    name: name of the object to be delivered
    destination: destination is where the object will be delivered to
    source: source is where the object will be taken from
    user: user is who created the request.
*/
var requestSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        name:String,
        destination:String,
        source:String,
        user:{type:Schema.Types.ObjectId,ref :collectionNames.user}
    }
);

mongoose.model(collectionNames.request,requestSchema);
module.exports = mongoose.model(collectionNames.request);
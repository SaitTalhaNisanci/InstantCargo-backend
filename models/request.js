
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    collectionNames = require('../common/constants').collectionNames;

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
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    collectionNames = require('../common/constants').collectionNames;

var userSchema  = new Schema (
    {
        _id : Schema.Types.ObjectId,
        username: {type:String,unique:true},
        rate:{
            score:{type:Number},
            amount:{type:Number}
        }
    }
) 

mongoose.model(collectionNames.user,userSchema);
module.exports = mongoose.model(collectionNames.user);
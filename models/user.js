var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    collectionNames = require('../common/constants').collectionNames;


/*
    id: id of the user
    username: username is a unique name that user chooses.
    rate: rate has two components
        score: totalScore of the user
        amount: how many times the user was rated.
*/
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
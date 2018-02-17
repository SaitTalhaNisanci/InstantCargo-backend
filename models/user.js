var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    collectionNames = require('../common/constants').collectionNames;


/*
    username: username is a unique name that user chooses.
    location : last known location of the user.
    rate: rate has two components
        score: totalScore of the user
        amount: how many times the user was rated.
*/
var userSchema  = new Schema (
    {
        username: {type:String,unique:true},
        location: { type: {type:String}, coordinates: [Number]},
        rate:{
            score:{type:Number},
            amount:{type:Number}
        }
    }
) 

mongoose.model(collectionNames.user,userSchema,collectionNames.user);
module.exports = mongoose.model(collectionNames.user);
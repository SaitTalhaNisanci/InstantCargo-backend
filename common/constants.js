
// Database constants
const connectionUrl = "mongodb://heroku_sn4pp7mh:b7j0q7h9mkacnh7ce2c6icmpnd@ds239648.mlab.com:39648/heroku_sn4pp7mh";

// Schema constants
const collectionNames = {
    request:"request",
    user:"user",
};
// Log constants
const logMessages = {
    locationSuccessfullyUpdated: "User location is successully updated.",
    nonExistentUserOrError: "User does not exist or there was an error.",
    userCreated: "A new user has been created!",
    requestCreated: "A new request has been created!",
}

// Unit constants
const km = 1000

module.exports={
    connectionUrl,
    collectionNames,
    km,
    logMessages
}
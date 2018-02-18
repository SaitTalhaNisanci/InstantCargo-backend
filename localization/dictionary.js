var defaultLogger = require('../logging/defaultLogger'),
    log = new defaultLogger(),
    constants = require('../common/constants'),
    logMessages = constants.logMessages;

function dictionary(language){
    var localizedDictionary = require('./dictionary.en.js');
    try {
        localizedDictionary = require('./dictionary.') + language + '.js';
        log.info(logMessages.languageChosen,language);
    }catch {
        log.warning(logMessages.languageChosen,constants.en);
    }finally{
        return localizedDictionary;
    }
}

module.exports = dictionary;
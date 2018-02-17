var Client = require('hazelcast-client').Client,
    defaultLogger = require('../logging/defaultLogger'),
    log = new defaultLogger();
module.exports = {
    insertRequestDeliverman : function (map, key, val, ttl) {
        return map.put(key, val, ttl).then( (previousValue) => {
            log.info('Put key: ' + key + ', value: ' + JSON.stringify(val) + ',  previous value: ' + JSON.stringify(previousVal));
        });
    }
}

module.exports = {
    getDeliverman : function (map, key) {
        return map.get(key);
    }
}

var shutdownHz = function(client) {
    return client.shutdown();
};

Client.newHazelcastClient().then(function (hazelcastClient) {
    module.exports = {
        map : hazelcastClient.getMap('Deliverman')
    }
});




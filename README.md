# getir2018Hackathon

This project is currently under active development.

## Instant Cargo
Instant Cargo is a platfowm where people can get fast cargo from available nearby drivers. If you forget any deliverable object or if you would like something to be delivered to some place you can make a request. People who would like to deliver will see the nearby requests. 

## Use Case Scenarios:
Burak is a student at Bogazici University. The weather is really nice and he wants to play frisbee but he realizes that he forgot his frisbee at Besiktas. He opens Instant Cargo app and he creates a new request. He chooses destination as Bogazici University and source as Besiktas.

Ahmet is in Besiktas and he is driving to Bogazici. He wants to check if there are any requests in Besiktas from Instant Cargo app. He sees Burak's request and he takes the frisbee and delivers it to Burak.
## Dependencies
* [express](https://expressjs.com) Rest Framework
* [mongoose](http://mongoosejs.com) NoSql database engine
* [hazelcast](https://github.com/hazelcast/hazelcast-nodejs-client) for caching.
* [chai](http://chaijs.com) Testing
* [mocha](https://mochajs.org) Testing
* [config](https://github.com/lorenwest/node-config) Production and testing seperation for databases
* [chalk](https://github.com/chalk/chalk) Logging with style for terminal
* [nodemon](https://nodemon.io)  starts the server whenever there is a change. This is for faster development.


[nodejs](https://nodejs.org) is the development language for server side.


## Test
To run the tests simlpy execute
```
npm test
```
Testing uses a different database than production database with the help of config module.

## Contributors
* [Atakan Guney](https://github.com/atakanguney)
* [Sait Talha Nisanci](https://github.com/SaitTalhaNisanci)




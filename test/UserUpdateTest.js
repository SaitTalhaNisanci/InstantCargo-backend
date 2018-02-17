process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let userModel = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('users', () => {
  /*
  * Test the /POST route and /PUT route
  */
  describe('/POST /user/create /PUT /user/updateLocation', () => {
    it('it should create a new user and update their location', (done) => {
      let user = {
          username: "shannonLast"
      }
      chai.request(server)
          .post('/user/create')
          .send(user)
          .end((err, res) => {
              res.should.have.status(201);
          });
       let update = {
            username:user.username,
            longitude: 10,
            latitude:20,
            type:"Point"
       }
       chai.request(server)
       .put('/user/updateLocation')
       .send(update)
       .end((err, res) => {
           res.should.have.status(200);
           done();
       });

    });
});
});
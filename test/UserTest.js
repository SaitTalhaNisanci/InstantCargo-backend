process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let userModel = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('users', () => {
    beforeEach((done) => {
        userModel.remove({}, (err) => { 
           done();         
        });     
    });
  /*
  * Test the /POST route
  */
  describe('/POST user', () => {
      it('it should create a new user', (done) => {
        let user = {
            username: "shannon"
        }
        chai.request(server)
            .post('/user/create')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('username');
                res.body.should.have.property('username').eql(user.username);
              done();
            });
      });
  });
});
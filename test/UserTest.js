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
  describe('/POST user /POST request', () => {
    it('it should create a new user', (done) => {
      let user = {
          username: "shannon"
      }
      var userID;
      chai.request(server)
          .post('/user/create')
          .send(user)
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('username');
              res.body.should.have.property('username').eql(user.username);
              userID =res.body._id;
          });
       let request = {
            destination: {type:"Point",coordinates:[20,10]} ,
            source:{type:"Point",coordinates:[20,10]},
            name:"frisbee",
            user:userID
       }
       chai.request(server)
       .post('/request/create')
       .send(request)
       .end((err, res) => {
           res.should.have.status(201);
           res.body.should.be.a('object');
           res.body.should.have.property('destination');
           res.body.should.have.property('source');
           res.body.should.have.property('name');
           res.body.should.have.property('created_at');
           res.body.should.have.property('_id');
           done();
       });

    });
});
});
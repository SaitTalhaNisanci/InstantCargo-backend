process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let requestModel = require('../models/request');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let defaultLogger = require('../logging/defaultLogger');
let log = new defaultLogger();

chai.use(chaiHttp);

describe('requests', () => {
    beforeEach((done) => {
        requestModel.remove({}, (err) => { 
           done();         
        });     
    });
  /*
  * Test the /POST route
  */
  describe('/POST request', () => {
      it('it should create a new request', (done) => {
        let request = {
            destination: {type:"Point",coordinates:[20,10]} ,
            source:{type:"Point",coordinates:[20,10]},
            name:"frisbee"
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
                res.body.should.have.property('name').eql(request.name);
                done();
            });
      });

  });
  /* 
   * Create a new request and make sure that getAll has that request.
   */
  describe('/POST request /POST getAll', () => {
    it('it should create a new request and have it in getAll', (done) => {
      let request = {
          destination: {type:"Point",coordinates:[20,10]} ,
          source:{type:"Point",coordinates:[20,10]},
          name:"frisbee"
      }
      let getAll = {
          latitude : 20,
          longitude: 10,
          distance : 10
      }
      chai.request(server)
          .post('/request/create')
          .send(request)
          .end();
      chai.request(server)
          .post('/request/getAll')
          .send(getAll)
          .end((err,res) => {
              res.should.have.status(200);
              done();   
          });

           
    });

});
});




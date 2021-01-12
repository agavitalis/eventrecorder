process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Event = require('../models/event');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();


chai.use(chaiHttp);

describe('Events', () => {
    beforeEach((done) => {
        Event.deleteMany({}, (err) => {
           done();
        });
    });
  describe('/GET event', () => {
      it('it should GET all the events', (done) => {
            chai.request(server)
            .get('/api/event')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST event', () => {
      it('it should not POST a event without eventName field', (done) => {
          let event = {
            description: "An adventure to Atlanta",
            location: "Texas USA",
            benefactorName: "Ogbonna Vitalis",
            status: "pending"
          }
            chai.request(server)
            .post('/api/event')
            .send(event)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('eventName');
                  res.body.errors.eventName.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a event ', (done) => {
          let event = {
            eventName: "Atlanta Visit",
            description: "An adventure to Atlanta",
            location: "Texas USA",
            benefactorName: "Ogbonna Vitalis",
            status: "pending"
          }
            chai.request(server)
            .post('/api/event')
            .send(event)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Event successfully added!');
                  res.body.event.should.have.property('eventName');
                  res.body.event.should.have.property('description');
                  res.body.event.should.have.property('location');
                  res.body.event.should.have.property('benefactorName');
                  res.body.event.should.have.property('status');
              done();
            });
      });
  });
  describe('/GET/:id event', () => {
      it('it should GET a event by the given id', (done) => {
          let event = new Event({ eventName: "The Hunt", description: "An amazing exprience", location: "Canada", benefactorName: "Ani Admans" ,status:  "done"});
          event.save((err, event) => {
              chai.request(server)
            .get('/api/event/' + event.id)
            .send(event)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('eventName');
                  res.body.should.have.property('description');
                  res.body.should.have.property('benefactorName');
                  res.body.should.have.property('location');
                  res.body.should.have.property('status');
                  res.body.should.have.property('_id').eql(event.id);
              done();
            });
          });

      });
  });
  describe('/PUT/:id event', () => {
      it('it should UPDATE a event given the id', (done) => {
        let event = new Event({ eventName: "The Hunt", description: "An amazing exprience", location: "Canada", benefactorName: "Ani Admans" ,status:  "pending"});
          event.save((err, event) => {
                chai.request(server)
                .put('/api/event/' + event.id)
                .send({eventName: "The Chronicles of Narnia", description: "A plasant mission", location: "USA", benefactorName: "Smith William", status: "done"})
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Event updated!');
                      res.body.event.should.have.property('status').eql("done");
                  done();
                });
          });
      });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id event', () => {
      it('it should DELETE a event given the id', (done) => {
        let event = new Event({ eventName: "The Hunt", description: "An amazing exprience", location: "Canada", benefactorName: "Ani Admans" ,status:  "pending"});
          event.save((err, event) => {
                chai.request(server)
                .delete('/api/event/' + event.id)
                .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('message').eql('Event successfully deleted!');
                      res.body.result.should.have.property('ok').eql(1);
                      res.body.result.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });
});
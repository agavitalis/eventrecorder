let mongoose = require('mongoose');
let Event = require('../models/event');

/*
 * GET /event route to retrieve all the events.
 */
function getEvents(req, res) {
    //Query the DB and if no errors, send all the events
    let query = Event.find({});
    query.exec((err, events) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(events);
    });
}

/*
 * POST /event to save a new event.
 */
function postEvent(req, res) {
    //Creates a new event
    var newEvent = new Event(req.body);
    //Save it into the DB.
    newEvent.save((err,event) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Event successfully added!", event });
        }
    });
}

/*
 * GET /event/:id route to retrieve a event given its id.
 */
function getEvent(req, res) {
    Event.findById(req.params.id, (err, event) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(event);
    });
}

/*
 * DELETE /event/:id to delete a event given its id.
 */
function deleteEvent(req, res) {
    Event.deleteOne({_id : req.params.id}, (err, result) => {
        res.json({ message: "Event successfully deleted!", result });
    });
}

/*
 * PUT /event/:id to updatea a event given its id
 */
function updateEvent(req, res) {
    Event.findById({_id: req.params.id}, (err, event) => {
        if(err) res.send(err);
        Object.assign(event, req.body).save((err, event) => {
            if(err) res.send(err);
            res.json({ message: 'Event updated!', event });
        });
    });
}

//export all the functions
module.exports = { getEvents, postEvent, getEvent, deleteEvent, updateEvent };
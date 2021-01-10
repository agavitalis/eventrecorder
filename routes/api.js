const express = require("express");
const router = express.Router();

/*
|-------------------------------------------------------------------------------
| Controller Import
|-------------------------------------------------------------------------------
*/
const eventController = require("../controllers/eventController");

/*
|-------------------------------------------------------------------------------
| Route Declearation
|-------------------------------------------------------------------------------
*/

router.get("/", (req, res) =>
	res.json({
		message: "Welcome to our Event Logger..Register your happy momets!",
	})
);

router
    .route("/event")
    .get(eventController.getEvents)
    .post(eventController.postEvent);

router
	.route("/event/:id")
	.get(eventController.getEvent)
	.delete(eventController.deleteEvent)
    .put(eventController.updateEvent);
    
/*
|-------------------------------------------------------------------------------
| Route Export
|-------------------------------------------------------------------------------
*/
module.exports = router;


let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//Event schema definition
let EventSchema = new Schema(
	{
		eventName: { type: String, required: true },
		description: { type: String, required: true },
		location: { type: String, required: true },
        benefactor: { type: String, required: true },
        status: {
            type: String,
            enum : ["active","past"],
            default: "active"
        }
	},
	{ timestamps: true }
);

//Exports the EventSchema for use elsewhere.
module.exports = mongoose.model("event", EventSchema);

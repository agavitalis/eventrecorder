let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//Event schema definition
let EventSchema = new Schema(
	{
		eventName: { type: String, required: true },
		description: { type: String, required: true },
		location: { type: String, required: true },
        benefactorName: { type: String, required: true },
        status: {
            type: String,
            enum : ["pending","inProgrress","done"],
            default: "pending"
        }
	},
	{ timestamps: true }
);

//Exports the EventSchema for use elsewhere.
module.exports = mongoose.model("event", EventSchema);

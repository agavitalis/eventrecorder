let express = require("express");
let mongoose = require("mongoose");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let app = express();
let port = 5000;

//we load the db location from the JSON files
let config = require("config");

//db connection
mongoose.connect(config.DBHost, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//don't show the log when it is test
if (config.util.getEnv("NODE_ENV") !== "test") {
	//use morgan to log at command line
	app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

//require routes
const routes = require("./routes/api.js");
app.use("/api", routes);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing

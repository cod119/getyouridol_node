var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
//var ejs = require("ejs");
//var ejsLayouts = require("express-ejs-layouts")
var engine = require("ejs-locals");
var app = express();

// var port = process.env.PORT || 8080;
var port = 8001;
var ip = process.env.IP || "localhost";
var controller = require(__dirname + "/controllers/server.js");

/* Setup express application */
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", engine);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* Load DB */
var db = require("./db");
global.db = db;
controller.sort(global.db, "nameko");

/* Set router */
app.use(express.static(__dirname + "/public"));
app.use("/", require("./routes/index"));

/* Launch Server */
var server = app.listen(port, function() {
  console.log("Express listening on port ", port);
});

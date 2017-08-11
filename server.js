var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
//var ejs = require("ejs");
//var ejsLayouts = require("express-ejs-layouts")
var engine = require("ejs-locals");
var app = express();

var port = process.env.PORT || 8080;
var ip = process.env.IP || "localhost";
// var port = 80;
// var ip = "0.0.0.0";

/* Setup express application */
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("ejs", engine);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(
    {
      key: "sid",
      secret: "secret",
      cookie: {
        maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
      },
      resave: true,
      saveUninitialized: false
    }
));

/* Load DB */
var db = require("./db");
global.db = db.idols();
global.admin = db.admin();
// controller.sort(global.db, "nameko");

/* Set router */
app.use(express.static(__dirname + "/public"));
app.use("/", require("./routes/index"));

/* Launch Server */
var server = app.listen(port, ip, function() {
  console.log("Express listening on port ", port, "at", ip);
});

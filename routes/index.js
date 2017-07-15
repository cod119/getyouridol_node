var express = require('express');
var router = express.Router();
var controller = require("../controllers");
var fs = require("fs");

var renderer = function(containerDir, mainDir) {
  var container = fs.readFileSync(containerDir , "utf8");
  var main = fs.readFileSync(mainDir , "utf8");
  var rendered = container.replace("<%temp%>", main);
  return rendered;
};

router.get("/", function(req, res) {
  res.render("index");
});
router.get("/about", function(req, res) {
  res.render("about");
});
router.get("/search", function(req, res) {
  res.render("search", controller.search);
});
router.get("/result", function(req, res) {
  res.render("result", {idols: controller.result.idols(req.query)});
})
router.get("/quicksearch", function(req, res) {
  req.query.name = req.query.term;
  res.send(controller.result.idols(req.query));
})
router.get("/admin", function(req, res) {

})
/**/

// router.get("/voca", function(req, res) {
//   var containerDir = __dirname + "/../public/container.html";
//   var mainDir = __dirname + "/../public/voca.html";
//   var page = renderer(containerDir, mainDir);
//   res.send(page);
// });

module.exports = router;

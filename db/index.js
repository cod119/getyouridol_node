var fs = require("fs");
var rawDb = fs.readFileSync(__dirname + "/namuami.json", "utf8");
var db = JSON.parse(rawDb);

module.exports = db
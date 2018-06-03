var fs = require("fs");


var controller = require("../controllers/db.js");

var output = {};

output.idols = function() {
    var rawDb = fs.readFileSync(__dirname + "/namuami.json", "utf8");
    var idols = JSON.parse(rawDb);
    controller.sort(idols, "nameko");
    
    return idols;
}

output.admin = function() {
    var rawAdmin = fs.readFileSync(__dirname + "/admin.json", "utf8");
    var admin = JSON.parse(rawAdmin);
    return admin;
}

module.exports = output;
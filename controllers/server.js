var helper = require(__dirname + "/helper.js");
var output = {};

output.sort = function sort(data, key, reverse) {
    reverse = reverse || 0;
    var x = 0;
    
    if (reverse === 0) {
        x = 1;
    } else {
        x = -1;
    }
    
    data.sort(function(a, b) {
        if (a[key] > b[key]) {
            return 1 * x
        } else if (a[key] < b[key]) {
            return -1 * x;
        } else {
            return 0
        }
    })
    
    data = helper.uniq(data);
};

module.exports = output;
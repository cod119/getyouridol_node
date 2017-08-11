var output = {};

output.checkUser = function(a, b) {
    if (a === undefined || b === undefined) {
        return false;
    }
    if (a.id === b.id && a.password === b.password) {
        return true;
    } else {
        return false;
    }
}

output.isToLogin = function(d) {
    if (d.id !== undefined && d.password !== undefined) {
        return true;
    } else {
        return false;
    }
}

module.exports = output;
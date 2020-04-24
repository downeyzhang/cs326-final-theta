var db = require("../db");

var user = db.model("user", {
    firstName:  String,
    lastName:   String,
    email:      String,
    password:   String
});

module.exports = user;
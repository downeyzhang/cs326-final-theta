var db = require("../db");

var user = db.model("user", {
    firstName:  String,
    lastName:   String,
    email:      String,
    password:   String,
    wish:       Array, //wish list, post id
    address:    String,
    city:       String,
    country:    String

});

module.exports = user;
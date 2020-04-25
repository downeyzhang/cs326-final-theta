var db = require("../db");

var user = db.model("user", {
    firstName:  String,
    lastName:   String,
    email:      String,
    password:   String,
    wish:Array  //愿望文章  文章id
});

module.exports = user;
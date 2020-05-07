var db = require("../db");

var user = db.model("user", {
    username:   String,
    firstName:  String,
    lastName:   String,
    email:      String,
    password:   String,
    photo:      { data: Buffer, contentType: String },
    postPublished:[String], //post id
    postAccepted:[String], //post id
    wishList:   [String], //post id
    address:    String,
    city:       String,
    country:    String,
    projects:   [String], //array of project id
    comments:   [String] //id of comments
});

module.exports = user;
var db = require("../db");

var post = db.model("post", {
    classId:    String, // class id e.g. CS187
    className:  String, 
    info:       String, //course infomation
    postby:     String,
    score:      String,
    requirement:    String,
    teammates:  String,
    comments:   [String]  // id of comments
});

module.exports = post;
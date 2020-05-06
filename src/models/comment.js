var db = require("../db");

var comment = db.model("comment", {
    user:       String, //id of user who post it
    post:       String, //id of post
    context:    String
});

module.exports = comment;
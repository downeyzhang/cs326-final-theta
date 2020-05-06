var db = require("../db");

var post = db.model("post", {
    pid:        String,
    info:       String, //course infomation
    score:      String, //grading policy
    require:    String, //requirement
    teammates:  Array,  //current teammate, teamate's email
});

module.exports = post;
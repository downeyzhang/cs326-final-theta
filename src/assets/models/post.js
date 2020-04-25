var db = require("../db");

var post = db.model("post", {
    info:  String,  //课程信息
    score:   String, //评分政策
    require:      String, //对队友的要求
    teammates:   String,  //目前的队友
});

module.exports = post;
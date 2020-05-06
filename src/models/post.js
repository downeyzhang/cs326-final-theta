var db = require("../db");

var post = db.model("post", {
    classId:    String, // class id e.g. CS187
    className:  String, 
    info:       String, //course infomation
    score:      {
        type: Map,
        of: String
    }, //each section and persentage
    require:    [String],
    teammates:  {
        type: Map,
        of: String
    },  //current teammate, teamate's id, their position e.g. key: Jiaming Yuan's id, value: Database
    comments:   [String]  // id of comments
});

module.exports = post;
var db = require("../db");

var project = db.model("project", {
    name:       String, //name of prject
    progress:   { type: Number, min: 0, max: 100 }, //percentage
    user:      [String], //user id
});

module.exports = project;
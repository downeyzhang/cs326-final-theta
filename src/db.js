var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@thetadatabase-peevn.mongodb.net/test?retryWrites=true&w=majority");
module.exports = mongoose;
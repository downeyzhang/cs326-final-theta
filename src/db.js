var mongoose = require("mongoose");

//database name: theta_database
//collection: user, post
mongoose.connect("mongodb+srv://admin:admin@thetadatabase-peevn.mongodb.net/test?retryWrites=true&w=majority");
module.exports = mongoose;
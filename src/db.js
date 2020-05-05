var mongoose = require("mongoose");
// const uri = "mongodb://localhost:27017/mydb";
const uri = "mongodb+srv://Jiamingyuan:yjm19990601@teammaker-cluster-w06oc.mongodb.net/teammaker?retryWrites=true&w=majority"
mongoose.connect(uri, function(err) {
    if (err) {
        console.log("MongoDB is not connected!");
    } else {
        console.log("Successfully connected to " + uri);
    }
});
module.exports = mongoose;


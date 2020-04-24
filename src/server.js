var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public", {index: 'login.html'}));

app.post("/create", function(req, res) {

    // Create a student from the submitted form data
    if (req.body.password === req.body.password_repeat){
        var user = new User({
            lastName: req.body.last_name,
            firstName: req.body.first_name,
            email: req.body.email,
            password: req.body.password
        });
    
        user.save(function(err, stu) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send("saved");
                // res.redirect('/login.html');
                // res.send("saved");
            }
        });
    } else {
        res.send("password should be same");
    }
});


app.listen(3000);
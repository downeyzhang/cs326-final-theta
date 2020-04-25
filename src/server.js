var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user");
var swig = require("swig");

var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public", {index: 'login.html'}));

app.engine('html', swig.renderFile);
app.set('views', './public');
app.set('view engine', 'html');
swig.setDefaults({cache: false});



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

app.post("/login",function(req,res){
    
    // TODO: verify the email address and password connecting to database
    var email = req.body.email;
    var password = req.body.password;

    if(password == '123' || password == 'abc'){
         //var result = {'code':'200', 'result':'success','username':'name from server'}
         //res.json(result);
        res.render('index');
    }
    else { 
         //var result = {'code':'400', 'result':'error',};
         //res.json(result);
        res.render('login');
    }
});



//


app.listen(port);
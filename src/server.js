var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user");
var swig = require("swig");
var mongoose =require("mongoose");

var port = process.env.PORT || 3000;
//var port = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public", {index: 'login.html'}));

app.engine('html', swig.renderFile);
app.set('views', './public');
app.set('view engine', 'html');
swig.setDefaults({cache: false});



app.post("/create", function(req, res) {
    var validater = req.body.validater;
    
    // Create a student from the submitted form data
    if (validater === "true"){
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
                res.render("login");
            }
        });
    }
});

app.post("/login",async function(req,res){
    
    // TODO: verify the email address and password connecting to database
    var email = req.body.email;
    var password = req.body.password;
    
    try{
        const user = await User.findOne({'email':email});
        console.log(user);
        //var json = JSON.stringify(user);
        if(user){
            if (user.password == password) {
                res.render('index');
            }
        } else {
            res.render('login', { errormessage: 'Incorrect Username or Password!'});
            // res.render('login');
        }  
    }catch(err){
        res.json({message:err});
    }
});



//


app.listen(port);
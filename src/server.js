var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user");
var swig = require("swig");
var mongoose =require("mongoose");
var cookieParser = require("cookie-parser");

var port = process.env.PORT || 3000;
//var port = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public", {index: 'login.html'}));

app.engine('html', swig.renderFile);
app.set('views', './public');
app.set('view engine', 'html');
swig.setDefaults({cache: false});

app.use(cookieParser('private'));

// app.use(function(req,res,next){
//     if(req.cookies['login']){
//         res.locals.login = req.cookies.login.email;
//     }else{
//         res.render('login');
//     }
//     next();
// });


app.post("/create", function(req, res) {
    var validater = req.body.validater;
    
    // Create a student from the submitted form data
    if (validater === "true"){
        var user = new User({
            lastName: req.body.last_name,
            firstName: req.body.first_name,
            email: req.body.email,
            password: req.body.password,
            address: "",
            city: "",
            country: ""
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
                // one hour cookie
                res.cookie('login',{email:email},{maxAge:1000*60*60});

                var lastName = user.lastName;
                var firstName = user.firstName;
                res.render('index',{username:firstName+"_"+lastName});
            }else{
                res.render('login');
            }
        } else {
            res.render('login', { errormessage: 'Account does not exists'});
            // res.render('login');
        }  
    }catch(err){
        res.json({message:err});
    }
});

app.get("/dashboard",async function(req,res){
    if(req.cookies['login']){
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        try{
            const user = await User.findOne({'email':email});
            console.log(user);
            
            //var json = JSON.stringify(user);
            if(user){
                
                var lastName = user.lastName;
                var firstName = user.firstName;
                res.render('index',{username:firstName+"_"+lastName});
            } else {
                // error
            }  
        }catch(err){
            res.json({message:err});
        }
    }else{
        res.render('login');
    }
});

app.get("/profile",async function(req,res){
    if(req.cookies['login']){
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        try{
            const user = await User.findOne({'email':email});
            console.log(user);
            
            //var json = JSON.stringify(user);
            if(user){
                
                var lastName = user.lastName;
                var firstName = user.firstName;
                var address = user.address;
                var city = user.city;
                var country = user.country;
                res.render('profile',{username:firstName+"_"+lastName, firstName:firstName, lastName:lastName, email:email,
                    address:address, city: city, country: country});
            } else {
                // error
            }  
        }catch(err){
            res.json({message:err});
        }
    }else{
        res.render('login');
    }
})

// update first name and last name
app.post("/updateBasic",async function(req,res){
    if(req.cookies['login']){
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        try{
            const user = await User.findOne({'email':email});
            console.log(user);
            
            //var json = JSON.stringify(user);
            if(user){
                await User.updateOne({email:email},{$set:{firstName:req.body.first_name,lastName:req.body.last_name}});
                // update the page again
                const user = await User.findOne({'email':email});
                console.log(user);
                if(user){
                    var lastName = user.lastName;
                    var firstName = user.firstName;
                    var address = user.address;
                    var city = user.city;
                    var country = user.country;
                    res.render('profile',{username:firstName+"_"+lastName, firstName:firstName, lastName:lastName, email:email,
                        address:address, city: city, country: country});
                } else {
                    // error
                }  
            } else {
                // error
            }  
        }catch(err){
            res.json({message:err});
        }
    }else{
        res.render('login');
    }
});


// update first name and last name
app.post("/updateAddress",async function(req,res){
    if(req.cookies['login']){
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        try{
            const user = await User.findOne({'email':email});
            console.log(user);
            
            //var json = JSON.stringify(user);
            if(user){
                await User.updateOne({email:email},{$set:{address:req.body.address,city:req.body.city,country:req.body.country}});
                // update the page again
                const user = await User.findOne({'email':email});
                console.log(user);
                if(user){
                    var lastName = user.lastName;
                    var firstName = user.firstName;
                    var address = user.address;
                    var city = user.city;
                    var country = user.country;
                    res.render('profile',{username:firstName+"_"+lastName, firstName:firstName, lastName:lastName, email:email,
                        address:address, city: city, country: country});
                } else {
                    // error
                }  
            } else {
                // error
            }  
        }catch(err){
            res.json({message:err});
        }
    }else{
        res.render('login');
    }
});


app.post("/logout",function(req,res){
    res.clearCookie('login');
    res.render('login');
})


//


app.listen(port);
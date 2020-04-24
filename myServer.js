
let express = require("express");
let swig = require("swig");
let bodyParser = require("body-parser");




let app = express();


//Serve static files from the public dir
app.use('/',express.static("src"));



app.engine('html', swig.renderFile);
app.set('views', './src');
app.set('view engine', 'html');
swig.setDefaults({cache: false});
app.use(bodyParser.urlencoded({extened:true}));

app.post("/login",function(req,res){
    
    // TODO: verify the email address and password connecting to database
    var email = req.body.email;
    var password = req.body.password;

    if(password == '123' || password == 'abc'){
        // var result = {'code':'200', 'result':'success','username':'name from server'}
        // res.json(result);
        res.render('index');
    }
    else { 
        // var result = {'code':'400', 'result':'error',};
        // res.json(result);
        res.render('login');
    }
});
//Start the web server on port 3000
app.listen(3000);

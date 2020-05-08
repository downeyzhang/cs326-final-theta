var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user");
var Post = require("./models/post");
var Comment = require("./models/comment");
var Project = require("./models/project");
var swig = require("swig");
var mongoose =require("mongoose");
var cookieParser = require("cookie-parser");


// var controllers = require('./controllers/post-controller');

var port = process.env.PORT || 3000;
//var port = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
        const posts = await Post.find();
        var plength = 0;
        var classNameArray = [];
        var classIdArray=[];
        var postNameArray=[];
        var count = 0;
        //var json = JSON.stringify(user);
        if(user){
            if (user.password == password) {
                // one hour cookie
                res.cookie('login',{email:email},{maxAge:1000*60*60});

                var lastName = user.lastName;
                var firstName = user.firstName;
                if(posts){
                    plength = posts.length;
                    for (var i = 0; i < 5; i++){
                        if(plength>i){
                            count++;
                            classNameArray.push(posts[i].className);
                            classIdArray.push(posts[i].classId);
                            postNameArray.push(posts[i].postby);
                        }else{
                            classNameArray.push(" ");
                            classIdArray.push(" ");
                            postNameArray.push(" ");
                        }
                    }
                }
                res.render('index',{username:firstName+"_"+lastName, count:count,classNameArray:classNameArray, classIdArray:classIdArray, postNameArray:postNameArray, page:1, total:plength});
            }else{
                res.render('login');
            }
        } else {
            res.render('login', { errormessage: 'Account does not exist'});
            // res.render('login');
        }  
    }catch(err){
        res.json({message:err});
    }
});

app.post("/dashboard",async function(req,res){
    if(req.cookies['login']){
        var page = req.body.page;
        console.log("page:"+page);
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        const posts = await Post.find();
        var plength = 0;
        var classNameArray = [];
        var classIdArray=[];
        var postNameArray=[];
        var count = 0;
        try{
            const user = await User.findOne({'email':email});
            console.log(user);
            
            //var json = JSON.stringify(user);
            if(user){
                
                var lastName = user.lastName;
                var firstName = user.firstName;

                if(posts){
                    plength = posts.length;
                    for (var i = 0; i < 5; i++){
                        if(plength>i+5*(page-1)){
                            count++;
                            classNameArray.push(posts[i+5*(page-1)].className);
                            classIdArray.push(posts[i+5*(page-1)].classId);
                            postNameArray.push(posts[i+5*(page-1)].postby);
                        }else{
                            classNameArray.push(" ");
                            classIdArray.push(" ");
                            postNameArray.push(" ");
                        }
                    }
                }

                res.render('index',{username:firstName+"_"+lastName, count:count,classNameArray:classNameArray, classIdArray:classIdArray, postNameArray:postNameArray, page:page,total:plength});
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


// update address
app.post("/updateAddress",async function(req,res){
    if(req.cookies['login']){
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        try{
            const user = await User.findOne({'email':email});
            console.log(user);
            // const promise = Post.find(params).exec();
            
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

app.get("/createYourPost",async function(req,res){
    if(req.cookies['login']){
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        try{
            const user = await User.findOne({'email':email});
            if(user){
                res.render('create',{username:user.firstName+"_"+user.lastName});
            }else{
                // error
            }
        }catch(err){

        }
    }else{
        res.render('login');
    }
});

app.post("/logout",function(req,res){
    res.clearCookie('login');
    res.render('login');
})


//Post   http://localhost:3000/${name}  =>  http://localhost:3000/post
//query
app.get('/post', async function (req, res) {
    const promise = await Post.find({}).exec();
    console.log(promise);
    res.json({message:promise});
})

//Create a post
app.post('/post',async function (req, res) {
    const task = req.body
    // console.log("post请求：")
    // console.log(req.body)
    const newPost = new Post(task);
    console.log(newPost.save());

    if(req.cookies['login']){
        var page = 1;
        console.log("page:"+page);
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        const posts = await Post.find();
        var plength = 0;
        var classNameArray = [];
        var classIdArray=[];
        var postNameArray=[];
        var count = 0;
        // try{
            const user = await User.findOne({'email':email});
            console.log(user);
            
            //var json = JSON.stringify(user);
            if(user){
                
                var lastName = user.lastName;
                var firstName = user.firstName;

                if(posts){
                    plength = posts.length;
                    for (var i = 0; i < 5; i++){
                        if(plength>i+5*(page-1)){
                            count++;
                            classNameArray.push(posts[i+5*(page-1)].className);
                            classIdArray.push(posts[i+5*(page-1)].classId);
                            postNameArray.push(posts[i+5*(page-1)].postby);
                        }else{
                            classNameArray.push(" ");
                            classIdArray.push(" ");
                            postNameArray.push(" ");
                        }
                    }
                }

                res.render('index',{username:firstName+"_"+lastName, count:count,classNameArray:classNameArray, classIdArray:classIdArray, postNameArray:postNameArray, page:1, total:plength});
            } else {
                // error
            }  
        // }catch(err){
        //     res.json({message:err});
        // }
    }else{
        res.render('login');
    }
})

app.post('/search', async function(req,res){
    if(req.cookies['login']){
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        var searchClass = req.body.searchClass;
        console.log(searchClass);
        try{
            const user = await User.findOne({'email':email});
            if(user){
                var lastName = user.lastName;
                var firstName = user.firstName;
                var plength = 0;
                var classNameArray = [];
                var classIdArray=[];
                var postNameArray=[];
                var count = 0;
                
                posts = await Post.find({'className':searchClass});
                console.log(posts);
                if(posts){
                    plength = posts.length;
                    for (var i = 0; i < 5; i++){
                        if(plength>i){
                            count++;
                            classNameArray.push(posts[i].className);
                            classIdArray.push(posts[i].classId);
                            postNameArray.push(posts[i].postby);
                        }else{
                            classNameArray.push(" ");
                            classIdArray.push(" ");
                            postNameArray.push(" ");
                        }
                    }
                    res.render('index',{username:firstName+"_"+lastName,count:count,classNameArray:classNameArray, classIdArray:classIdArray, postNameArray:postNameArray, page:1, total:plength});
                }
            }else res.send('error');
        }catch(err){
            //error
        }
    }else{
        res.render('login')
    }

});


app.post('/postDetail',async function(req,res){
    if(req.cookies['login']){
        res.locals.login = req.cookies.login.email;
        var email = req.cookies.login.email;
        try{
            const user = await User.findOne({'email':email});
            if(user){
                console.log("req.body:"+req.body.classId);
                var classId = req.body.classId;
                var className=req.body.className;
                var postby = req.body.postby;
                const post = await Post.findOne({'classId':classId,'className':className, 'postby':postby});
                console.log(post);
                if(post){
                    var info = post.info;
                    var requirement=post.requirement;
                    var teammate = post.teammates;
                    console.log(requirement);
                    res.render('post',{username:user.firstName+"_"+user.lastName, classId:classId, className:className, info:info,postby:postby,requirement:requirement,teammate:teammate});
                }else res.send('can not find post');
            }else{
                // error
            }
        }catch(err){

        }
    }else{
        res.render('login');
    }
});

//update
app.put('/post',async function (req, res) {
    const post = await Post.findOne({'id':req.body.id});
    console.log(post);
    if(post){
        await Post.updateOne({id:req.body.id},{$set:{info:req.body.info}});
        // update the page again
        const post = await Post.findOne({'id':req.body.id});
        console.log(post);
    }
    res.json({message:true});
})

//delete  (http://localhost:3000/post/5eb36aaff162296b084c7093)
app.delete('/post/:id',async function (req, res) {
    const postId =  req.params.id
    console.log("postId:"+postId)
    const promise =await Post.findByIdAndRemove(postId).exec();
    console.log(promise);
    res.json({message:promise});
})

//Comment
app.get('/comment', async function (req, res) {
    console.log("post:"+req.query.post)
    const promise = await Comment.find({}).exec();
    var list = [];
    promise.forEach(element => {
        if(element.post == req.query.post){
            list.push(element)
        }
    });
    res.json({message:list});
})

app.delete('/comment/:id',async function (req, res) {
    const commentId =  req.params.id
    console.log("commentId:"+commentId)
    const promise =await Comment.findByIdAndRemove(commentId).exec();
    console.log(promise);
    res.json({message:promise});
})


app.put('/comment',async function (req, res) {
    const comment = await Comment.findOne({'id':req.body.id});
    console.log(comment);
    if(comment){
        await Comment.updateOne({id:req.body.id},{$set:{context:req.body.context}});
        // update the page again
        const comment = await Comment.findOne({'id':req.body.id});
        console.log(comment);
    }
    res.json({message:true});
})

app.put('/group',async function (req, res) {
    const id = req.body.id
    const pro = await Project.findOne({'id':id});
    var user = pro.user
    var exit= false;
    user.forEach(element => {
        if(element == req.body.postId){
            exit = true;
        }
    });
    if(!exit){
        user.push(req.body.postId)
    }
    if(pro){
        await Project.updateOne({id:id},{$set:{user:user,}});
        // update the page again
        const pro = await Project.findOne({'id':id});
    }
    res.json({message:true});
})

app.post('/join',function (req, res) {
    const newPro = new Project(req.body);
    console.log(newPro.save());
    res.json({message:true});
})

app.get('/join', async function (req, res) {
    console.log("status:"+req.query.status)
    await Project.updateOne({id:req.query.id},{$set:{progress:req.query.status,}});
    res.json({message:true});
})


//WishList
//New
app.put('/wish',async function (req, res) {
    const email = req.body.email
    const user = await User.findOne({'email':email});
    var wishList = user.wishList
    var exit= false;
    wishList.forEach(element => {
        if(element == req.body.postId){
            exit = true;
        }
    });
    if(!exit){
        wishList.push(req.body.postId)
    }
    if(user){
        await User.updateOne({email:email},{$set:{wishList:wishList,}});
        // update the page again
        const user = await User.findOne({'email':email});
        console.log("之后：")
        console.log(user);
    }
    res.json({message:true});
})


//Delete
app.delete('/wish/:email/:postId',async function (req, res) {
    const email = req.params.email
    const user = await User.findOne({'email':email});
    var wishList = user.wishList
    var newWishList = [];
    wishList.forEach(element => {
        if(element != req.params.postId){
            newWishList.push(element)
        }
    });
    if(user){
        await User.updateOne({email:email},{$set:{wishList:newWishList,}});
        // update the page again
        const user = await User.findOne({'email':email});
    }
    res.json({message:true});
})




app.listen(port);




//finish
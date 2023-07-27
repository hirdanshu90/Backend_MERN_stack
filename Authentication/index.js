const express = require("express");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const path = require("path");
// for this to work, I downloaded 'npm i body-parser'  ... This is to parse through the body 
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken");
const { request } = require("http");
const bcrypt = require("bcrypt");

const app = express();
const port = 5000;

// Using MIDDLEWARE

// accessing the static path from PUBLIC folder, directly by using the app.use middleware .... 
app.use(express.static(path.join(path.resolve(), "public")));
// This middleware is used to access the body of the form ...
app.use(express.urlencoded({extended: true}))

// Setting up View engine, so that we don't have to type the extension again and again. Here one can access the HTML elements from Javascript.
app.set("view engine", "ejs")
app.use(cookieParser());

// Connecting to mongo DB
mongoose.connect("mongodb://127.0.0.1:27017/backend", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Creating a schema here
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});


// Creating a collection (inputting values) ... Name is USER here ....
const User = mongoose.model("User", userSchema)


// .... AUTHENTICATION ....
const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies;
    if(token){
        const decoded = jwt.verify(token, "affadfaderff");
        req.user = await User.findById(decoded._id)
        next();
    }
    else{
        res.redirect("/login")
    }
}


// Register get request ...
app.get("/register", (req,res)=>{
    res.render("register");
})

// Login get request ....
app.get("/login", (req,res) =>{
    res.render("login")
});


// LOGOUT get request ... 
app.get("/logout", (req,res)=>{
    res.cookie("token",null,
    {
        httpOnly: true, 
        expires: new Date(Date.now())
    });
    res.redirect("/")
})

// Home PAGE get request, After successful LOGIN ....
app.get("/", isAuthenticated,  (req,res)=>{
    res.render("logout", {name:req.user.name})

})


// Register the user here ... 
app.post("/register", async(req,res)=> {
    
    // Accessing after destructuring
    const {name, email, password} = req.body;

    let user = await User.findOne({email})
    if(user){
        return res.redirect("/login")
    }

    const hassedPassword = await bcrypt.hash(password, 10)
    // Creating new user ... 
     user = await User.create({
        name,
        email,
        password: hassedPassword,
    })

// Creating TOKEN
const token = jwt.sign({_id: user._id}, "affadfaderff", );
console.log(token);

    res.cookie("token", token,{
        httpOnly: true, 
        expires: new Date(Date.now()+ 60*1000 )
    });
    res.redirect("/")
 })

// LOGIN post request ...
app.post("/login",async (req,res)=>{
    const {email, password} = req.body;

    let user = await User.findOne(({email}));
    if(!user){
        return res.redirect("/register")
    }

    const isMatch =await (bcrypt.compare(password, user.password));

    if (!isMatch){
        return res.render("login", {email, message: "Incorrect password"});
    }
    // Creating TOKEN
    const token = jwt.sign({_id: user._id}, "affadfaderff", );


    res.cookie("token", token,{
        httpOnly: true, 
        expires: new Date(Date.now()+ 60*1000 )
    });
    res.redirect("/")
 })





// Running the PORT ... 
app.listen(port, ()=>{
    console.log(`Server is working on port: ${port}`)
})
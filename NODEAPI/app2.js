// Importing...
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

// Refering to express as app..
const app = express();


// Using Middleware ... This is to access req.body
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}));


// Connecting to mongo DB
mongoose.connect("mongodb://127.0.0.1:27017/backendAPI", { useNewUrlParser: true, useUnifiedTopology: true })
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


// READ product... GET request
app.get("/users/all", async(req,res)=>{
    const users = await User.find({});
    console.log(req.query)

    res.status(200).json({
        success:true,
        users,
    })
})

// Dynamic URL...  /:id, id can be anything
// Keep the dynamic route at last. 

app.get("/userid/:userId", async(req,res)=> {

    // Here variable will be access by req.query or by req.params. Its name will be userId Here...
    const {userId} = req.params;
    const user = await User.findById(userId)

    res.json({
        success:true,
        user,
    })
})

app.get("/", (req,res)=>{
    res.send("Working noice")
})


// Creating a user... POST request
app.post("/users/new", async(req,res)=>{

    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password,

    })

    res.status(201).cookie("tempi", "lol").json({
        success:true,
        message: "Registered successfully",
    })
})

app.listen(4500, ()=>{
    console.log("Server is working")
})
// Downloaded the mongoose dependency.  


const mongoose = require("mongoose");

// IPv6 Loopback Address: The error message shows that the connection is being attempted to ::1:27017, which is the IPv6 loopback address equivalent to localhost (IPv4).
//  Some systems prioritize IPv6 connections over IPv4. 
// You can try explicitly specifying the IPv4 loopback address in the connection URL to ensure it connects using the correct network stack.
//  Modify the connection URL to mongodb://127.0.0.1:27017.
mongoose.connect("mongodb://127.0.0.1:27017/Sample", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Creating a db here, its structure...
const student = new mongoose.Schema({
    name:String,
    workout:Boolean,
    height:Number
})
// Model is a collection
const Student= new mongoose.model("Student", student);

// Creating a function to add
const adder = async() => {
    const name = await Student.create({
        name:"Manuj",
        workout:true,
        height:6
    })
}
// Creating a function to read...
const reader = async()=>{
    const reads = await Student.find({height:{$eq:6}})
    console.log(reads)

}

// adder()
reader()
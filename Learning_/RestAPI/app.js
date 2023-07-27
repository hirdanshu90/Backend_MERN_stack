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
mongoose.connect("mongodb://127.0.0.1:27017/Sample2", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Creating a schema here
const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number
})

// Creating a collection (inputting values) ... 
const Product = new mongoose.model("Product", productSchema)


// Creating a Product... POST request
app.post("/api/v1/product/new", async(req,res)=>{
    const prod = await Product.create(req.body);
    res.status(201).json({
        success:true,
        prod
    })
})

// READ product... GET request
app.get("/api/v1/products", async(req,res)=>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
})

// Update Product... PUT request    (:id - means it is a variable, have to enter)
app.put("/api/v1/product/:id", async(req,res)=>{
    // Finding the product by id
    let product = await Product.findById(req.params.id);

    // If product not found... 
    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    // Updating it ...
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useFindAndModify: false,
        runValidators: true
    })
    res.status(200).json({
        success:true,
        product
    })

})

// Delete Product ... Delete request
app.delete("/api/v1/product/:id", async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Product is deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  });
  

app.listen(4500 , ()=>{
    console.log("Server is working http://localhost:4500")
})
// Here we render the form ....
app.get("/", (req,res) =>{
    res.render("index", {name:"Hirdanshu Vij"})
})


app.get("/add", async(req,res) => {
    await Message.create({name:"Vij", email:"Noone@gmail.com"})
        res.send("Nice")
    });

app.get("/success", (req,res) => {
    res.render("success")
})
app.get("/users", (req,res) => {
    res.json({
        users,
    })
})

// Here this will create the object taken from the form inside the mongo db ... 
// Putting it all together, const {name, email} = req.body; takes the req.body object, extracts the properties name and email, and assigns their values to the variables name and email, respectively.
// eQUIVALENT TO const name = req.body.name;    
app.post("/contact", async (req,res)=>{
    const {name, email} = req.body; 
    await Message.create({name: name, email: email} )
    res.redirect("/success")
})

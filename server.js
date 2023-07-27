const app = require("./NODEAPI/app2.js");

const connectDB = require("./data/database.js");

// Calling the connect database function ...
connectDB();


app.listen(process.env.PORT, () => {
  console.log("Server is working");
});

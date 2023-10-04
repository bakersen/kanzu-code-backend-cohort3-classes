
//Import
const express = require("express");
const colors = require("colors");
const path = require("path");
const app = express();
const port = 5000;

const studentRoute = require("./routes/studentRoute");


//Middleware
app.use(express.static("public"));
app.use(express.json());

app.use((err, req, res, next)=>{
	res.send(`${err.message}`);
})

//Routes
app.use("/", studentRoute);




//Server running

app.listen(port, () => {
	console.log(`Server running on port ${port}`.yellow);
});












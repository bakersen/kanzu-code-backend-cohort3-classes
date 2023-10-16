//Import
const express = require("express");
const colors = require("colors");
const app = express();
const port = 5000;
const studentsRoute =  require("./v1/routes/studentsRoute")


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes
app.use("/api/v1/students", studentsRoute);


app.use("*", (req, res) => {
	res.status(404).json({ status: "Endpoint doesn't exist" });
});

//Server running
app.listen(port, () => {
	console.log(`Server running on port ${port}`.blue);
});

//Import
const express = require("express");
const colors = require("colors");
const app = express();
const port = 5000;
const studentsRoute =  require("./v1/routes/studentsRoute");
const studentsRoute2 = require("./v2/routes/studentsRoute");
const authRoute = require("./v1/routes/authRoute");
const coursesRoute = require("./v2/routes/coursesRoute");
// const verifyToken = require("./middlewares/verifyToken")

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Routes

app.use("/api/v1/auth", authRoute);

app.use("/api/v1/students", studentsRoute);
app.use("/api/v2/students", studentsRoute2);
app.use("/api/v2/courses", coursesRoute);

app.use("*", (req, res) => {
	res.status(404).json({ status: "Endpoint doesn't exist" });
});

//Server running
app.listen(port, () => {
	console.log(`Server running on port ${port}`.blue);
});

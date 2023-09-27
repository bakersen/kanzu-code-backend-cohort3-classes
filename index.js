const express = require("express");
const colors = require('colors');
const path = require("path")
const app = express();
const port = 5000;

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded())

const students = [
	{ id: 1, name: "Frank" },
	{ id: 2, name: "Moses" },
	{ id: 3, name: "Marvin" },
	{ id: 4, name: "Clive Peter" },
];


app.get("/kanzucode/students/:id", (req, res) => {
	try {
		const findStudent = students.find((value)=>{
			if (JSON.stringify(value.id) === req.params.id) {
				return value;
			}else {
				throw new Error("Student not found")
			}
		});
	}catch(err){
		res.status(400).json({
			error:`${err.message}`
		})
	}
});

app.post("/", (req, res) => {
	res.send("Post request");
});

app.put("/", (req, res) => {
	res.send("Put request");
});

app.delete("/", (req, res) => {
	res.send("Delete request");
});

app.use("*", (req, res) => {
	res.status(404).send("Not found");
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`.yellow);
});

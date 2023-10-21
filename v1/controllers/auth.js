const bycrypt = require("bcryptjs");
const db = require("../database/db.json");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//Login
const login = async (req, res) => {
	const { email, hashedPassword } = req.body;

	if (!email || !hashedPassword) {
		return res.sendStatus(400);
	}

	const userIndex = db.students.findIndex((value) => value.email === email);

	if (userIndex === -1) {
		return res.sendStatus(404);
	}

   console.log(db.students[userIndex]);
   console.log(process.env.SECRET);

	const newpassword = await bycrypt.compare(
		hashedPassword,
		db.students[userIndex].hashedPassword
	);

	if (!newpassword) {
		return res.status(401).json({ error: "Invalid credentials" });
	}

	const payload = {
		id: db.students[userIndex].id,
		email: db.students[userIndex].email,
	};


	const token = jwt.sign(payload, process.env.SECRET, {expiresIn:"1m"});

   res.status(200).json({ status: "0k", access_token: token });
};

module.exports = {login}

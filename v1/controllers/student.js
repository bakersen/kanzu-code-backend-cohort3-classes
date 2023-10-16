const db = require("../database/db.json");
const saveToDatabase = require("../../lib/saveToDatabase");
const bcrypt = require("bcryptjs");

const getAllStudents = (req, res) => {
	try {
		res.status(200).json({ status: 200, data: db.students });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: `${err.message}` });
	}
};

const getOneStudents = (req, res) => {
	const id = parseInt(req.params.id) - 1;
	const userExists = db.students.findIndex((value) => value.id === id) > -1;

	if (!userExists) {
		return res.status(404).json({ error: "Record doesn't exist" });
	}

	return res.status(200).json({ data: db.students[id] });
};

const createStudent = async (req, res) => {
	const { name, email, phone, password, course } = req.body;
	//Check data is valid

	if (!name || !email || !phone || !password || !course) {
		return res.status(400).json({ status: 400, msg: "Missing or empty fields" });
	}

	//Check if user doesn't exist
	const userExists =
		db.students.findIndex((value) => value.email === email) > -1;

	if (userExists) {
		return res.status(400).json({ status: 400, msg: "Record exists already" });
	}

	//save to database
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = {
		id: db.students[db.students.length-1].id + 1,
		name,
		email,
		phone,
		hashedPassword,
		course,
		createdAt: new Date(),
	};

	db.students.push(newUser);
	saveToDatabase(db);

	res.status(201).json({ status: 201, data: db.students });
};

const updateStudent = async (req, res) => {
	const id = parseInt(req.params.id);
	const userIndex = db.students.findIndex((value) => value.id === id);

	if (userIndex === -1) {
		return res.status(404).json({ error: "Record doesn't exist" });
	} else {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(
			db.students[userIndex].password,
			salt
		);

		const updatedPassword = { password: hashedPassword };
		const updatedStudent = {
			...db.students[userIndex],
			...updatedPassword,
         updatedAt: new Date()
		};
		db.students[userIndex] = updatedStudent;
		saveToDatabase(db);
		res.status(200).json({ status: 200, msg: "Record updated" });
	}
};

const deleteStudents = (req, res) => {
	const id = parseInt(req.params.id);
	const userIndex = db.students.findIndex((value) => value.id === id);

	if (userIndex === -1) {
		return res.status(404).json({ error: "Record doesn't exist" });
	} else {
		db.students.splice(userIndex, 1);
		saveToDatabase(db);
		res.status(200).json({ status: 200, msg: "Record deleted" });
	}
};

module.exports = {
	getAllStudents,
	getOneStudents,
	createStudent,
	updateStudent,
	deleteStudents,
};

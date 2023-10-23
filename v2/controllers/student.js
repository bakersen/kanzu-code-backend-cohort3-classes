const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const getAllStudents = async (req, res) => {
	try {
		const students = await prisma.student.findMany();
		res.status(200).json({ status: 200, data: students });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: `${err.message}` });
	}
};

const getOneStudents = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const userExists = await prisma.student.findUnique({
			where: { id },
		});

		if (!userExists) {
			return res.status(404).json({ error: "Record doesn't exist" });
		}
		return res.status(200).json({ data: userExists });
	} catch (error) {
		console.log(error);
		res.status(400).json({ status: 400, error: `${error.message}` });
	}
};

const createStudent = async (req, res) => {
	try {
		const { name, email, phone, password, course } = req.body;
		//Check data is valid

		if (!name || !email || !phone || !password || !course) {
			return res.status(400).json({ status: 400, msg: "Missing or empty fields" });
		}

		//Check if user doesn't exist
		const userExists = await prisma.student.findUnique({ where: { email } });

		if (userExists) {
			return res.status(400).json({ status: 400, msg: "Record exists already" });
		}

		//save to database
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await prisma.student.create({
			data: {
				name: name.trim(),
				email: email.trim(),
				phone: phone.trim(),
				password: hashedPassword,
				course: course.trim(),
			},
		});
		res.status(201).json({ status: 201, data: newUser });
	} catch (error) {
		console.log(error);
		res.status(400).json({ status: 400, error: `${error.message}` });
	}
};

const updateStudent = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const userExists = await prisma.student.findUnique({ where: { id } });

		if (!userExists) {
			return res.status(404).json({ error: "Record doesn't exist" });
		}

		const updatedUser = await prisma.student.update({
			where: { id },
			data: req.body,
		});

		return res
			.status(200)
			.json({ status: 200, msg: "Record updated", data: updatedUser });
	} catch (error) {
		console.log(error);
		res.status(400).json({ status: 400, error: `${error.message}` });
	}
};

const deleteStudents = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const userExists = await prisma.student.findUnique({ where: { id } });

		if (!userExists) {
			return res.status(404).json({ error: "Record doesn't exist" });
		}

		await prisma.student.delete({
			where: { id },
		});

		return res
			.status(200)
			.json({ status: 200, msg: "Record deleted successfully" });
	} catch (err) {
		console.log(error);
		res.status(400).json({ status: 400, error: `${error.message}` });
	}
};

module.exports = {
	getAllStudents,
	getOneStudents,
	createStudent,
	updateStudent,
	deleteStudents,
};
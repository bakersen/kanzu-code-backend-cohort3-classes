const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const {courseValidation} = require("../../lib/validations");

const getAllCourses = async (req, res) => {
	try {
		const courses = await prisma.course.findMany({
			include: {
				students: {
					include: {
						profile: {
							select: {
								name: true,
								email: true
							},
						},
					},
				},
				instructors: true,
			},
		});
		res.status(200).json({ status: 200, data: courses });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: `${err.message}` });
	}
};

const createCourse = async (req, res) => {
	try {
		const { name, deliveryMode, tuition } = req.body;
		//Check data is valid

		const { error } = courseValidation(req.body);
		if (error) return res.status(400).json({ message:error.details[0].message});

		//Check if user doesn't exist
		const courseExists = await prisma.course.findFirst({
			where: { course_name: name },
		});

		if (courseExists) {
			return res.status(400).json({ status: 400, msg: "Record exists already" });
		}

		const newCourse = await prisma.course.create({
			data: {
				course_name: name.trim(),
				mode_of_delivery: deliveryMode.trim(),
				course_tuition: parseInt(tuition.trim()),
			}
		});

		res.status(201).json({ status: 201, data: newCourse });
	} catch (error) {
		console.log(error);
		res.status(400).json({ status: 400, error: `${error.message}` });
	}
};

const deleteCourses = async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		const userExists = await prisma.course.findUnique({ where: { id } });

		if (!userExists) {
			return res.status(404).json({ error: "Record doesn't exist" });
		}

		await prisma.course.delete({
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
	getAllCourses,
	createCourse,
	deleteCourses,
};

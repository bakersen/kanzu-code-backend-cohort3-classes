const Joi = require("@hapi/joi");

const courseValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		deliveryMode: Joi.string().required(),
		tuition: Joi.number().required()
	});
	return schema.validate(data);
};

const studentValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		phone: Joi.string().length(10).required(),
		courseId: Joi.number().required(),
		password: Joi.string().min(5).required(),
	});
	return schema.validate(data);
};

module.exports = {
	courseValidation,
	studentValidation,
};

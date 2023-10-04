const sentenceCaser = require("sentence-caser");

function nameMiddleware(req, res, next) {
	const newName = sentenceCaser(req.params.name);
	req.params = newName;
	next();
}

module.exports = nameMiddleware;

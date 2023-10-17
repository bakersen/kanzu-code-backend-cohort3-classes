const fs = require("fs");

//save to the database

const saveToDatabase = (DB) => {
	fs.writeFileSync("./v1/database/db.json", JSON.stringify(DB, null, 2), {
		encoding: "utf-8",
	});
};



module.exports = saveToDatabase;

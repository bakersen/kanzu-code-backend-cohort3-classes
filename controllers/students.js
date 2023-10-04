function displayStudent(req, res){
   console.log("students route");
	res.send(`Student name: ${JSON.stringify(req.params)}`);
}


module.exports = { displayStudent };
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const verifyToken =async(req, res, next)=>{
   const header = req.headers["authorization"];
   console.log(req.headers["authorization"]);

   if(!header){
      return res.status(401).json({ error: "Not authorized to access this resource" });
   }

   const token = header.split(" ")[1]

   jwt.verify(token, process.env.SECRET, (error, user)=>{
      if(error) return res.status(403).json({error:"Invalid token"})
      console.log(user)
      next();
      return
   })
}

module.exports = verifyToken

const express = require("express")
const router = express.Router()
const studentsController = require("../controllers/student");

router.get("/", studentsController.getAllStudents);
router.post("/", studentsController.createStudent);
router.get("/:id", studentsController.getOneStudents);
router.put("/:id", studentsController.updateStudent);
router.delete("/:id", studentsController.deleteStudents);


module.exports = router
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course");

router.get("/", courseController.getAllCourses);
router.post("/", courseController.createCourse);
router.delete("/:id", courseController.deleteCourses);

module.exports = router;

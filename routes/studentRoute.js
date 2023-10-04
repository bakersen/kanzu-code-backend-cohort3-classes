const express = require("express");
const router = express.Router();
const { displayStudent } = require("../controllers/students");
const sentenceCase = require("../middlewares/sentenceCase")

router.get("/students/:name", sentenceCase, displayStudent);

module.exports = router;

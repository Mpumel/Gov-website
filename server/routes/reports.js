const express = require("express");
const router = express.Router();
const { createReport } = require("../controllers/reportController");

// Public: anyone must be able to submit a report, so no verifyToken here
router.post("/", createReport);

module.exports = router;

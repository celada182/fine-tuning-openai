const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

router.post("/test", apiController.test);

module.exports = router;
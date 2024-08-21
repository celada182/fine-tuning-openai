const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

router.post("/test", apiController.test);
router.post("/transform-data", apiController.transformData);

module.exports = router;
const express = require("express");
const apiController = require("../controllers/apiController");
const router = express.Router();

router
    .post("/test", apiController.test)
    .post("/transform-data", apiController.transformData)
    .post("/upload-file", apiController.uploadFile)
    .get("/list-files", apiController.listFiles)
    .get("/retrieve-file/:id", apiController.retrieveFile);

module.exports = router;
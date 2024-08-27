const fileService = require("../services/file/fileService");
const fineTuneService = require("../services/file/fineTuneService");

async function test(req, res) {
    res.send("Test ok");
}

async function transformData(req, res) {
    await fileService.tranformData();
    res.send();
}

async function uploadFile(req, res) {
    const response = await fileService.uploadFile();
    if (response) {
        res.status(200).send(response);
    } else {
        res.status(500).send(response);
    }
}

async function listFiles(req, res) {
    const response = await fileService.listFiles();
    res.status(response.response.status).send(response.data);
}

async function retrieveFile(req, res) {
    var id = req.params['id'];
    const response = await fileService.retrieveFile(id);
    if (response.response) {
        res.status(response.response.status).send(response.data);
    } else {
        res.status(404).send(response);
    }
}

async function deleteFile(req, res) {
    var id = req.params['id'];
    const response = await fileService.deleteFile(id);
    if (response.response) {
        res.status(response.response.status).send(response.data);
    } else {
        res.status(404).send(response);
    }
}

async function createFineTune(req, res) {
    var id = req.params['id'];
    const response = await fineTuneService.createFineTune(id);
    console.log(response);
    res.status(response.status).send(response.data);
}

module.exports = {
    test,
    transformData,
    uploadFile,
    listFiles,
    retrieveFile,
    deleteFile,
    createFineTune
}
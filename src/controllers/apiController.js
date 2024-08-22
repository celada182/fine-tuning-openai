const fileService = require("../services/file/fileService");

async function test(req, res) {
    res.send("Test ok");
}

async function transformData(req, res) {
    await fileService.tranformData();
    res.send();
}

async function uploadFile(req, res) {
    const response = await fileService.uploadFile();
    res.status(response.status).send(response.data);
}

async function listFiles(req, res) {
    const response = await fileService.listFiles();
    res.status(response.status).send(response.data);
}

async function retrieveFile(req, res) {
    var id = req.params['id'];
    const response = await fileService.retrieveFile(id);
    if (response.status) {
        res.status(response.status).send(response.data);
    } else {
        res.status(404).send(response);
    }
}

module.exports = {
    test,
    transformData,
    uploadFile,
    listFiles,
    retrieveFile
}
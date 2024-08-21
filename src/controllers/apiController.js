const trandformDataService = require("../services/file/transformDataService");

async function test(req, res) {
    res.send("Test ok");
}

async function transformData(req, res) {
    await trandformDataService.tranformData();
    res.send();
}

module.exports = {
    test,
    transformData
}
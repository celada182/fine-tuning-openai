var xlsx = require("xlsx");
const fs = require("fs");
const OpenAI = require("openai");
const openai = new OpenAI();

async function tranformData() {
    var workbook = xlsx.readFile("src/shared/data-set.xlsx");
    var shet_name_list = workbook.SheetNames;
    var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[shet_name_list[0]]);

    var objects = "";
    for (const item of xlData) {
        var object = `{"promt": "${item.Question} ->", "completion": "${item.Answer} END"}\r\n`;
        objects = objects.concat(object);
    }
    fs.appendFileSync("src/shared/data-set.jsonl", objects, "utf8", function () { });
}

async function uploadFile() {
    const response = await openai.files.create({
        file: fs.createReadStream("src/shared/data-set.jsonl"),
        purpose: "fine-tune"
    });
    return response;
}

async function listFiles() {
    const response = await openai.files.list();
    return response;
}

async function retrieveFile(id) {
    try {
        const response = await openai.files.retrieve(id);
        return response;
    } catch (e) {
        return "File id not found";
    }
}

async function deleteFile(id) {
    try {
        const response = await openai.files.del(id);
        return response;
    } catch (e) {
        return "File id not found";
    }
}

module.exports = {
    tranformData,
    uploadFile,
    listFiles,
    retrieveFile,
    deleteFile
}
var xlsx = require("xlsx");
const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");
const API_KEY = process.env.API_KEY || "";
const configuration = new Configuration({ apiKey: API_KEY });
const openai = new OpenAIApi(configuration);

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
    const response = await openai.createFile(fs.createReadStream("src/shared/data-set.jsonl"), "fine-tune");
    return response;
}

async function listFiles() {
    const response = await openai.listFiles();
    return response;
}

async function retrieveFile(fileId) {
    try {
        const response = await openai.retrieveFile(fileId);
        return response;
    } catch (e) {
        return "File id not found";
    }
}

module.exports = {
    tranformData,
    uploadFile,
    listFiles,
    retrieveFile
}
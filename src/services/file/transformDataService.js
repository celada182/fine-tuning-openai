var xlsx = require("xlsx");
const fs = require("fs");

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

module.exports = {
    tranformData
}
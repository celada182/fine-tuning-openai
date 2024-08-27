const OpenAI = require("openai");

const openai = new OpenAI();

async function createFineTune(fileId) {
    try {
        const response = openai.fineTuning.jobs.create({
            training_file: fileId,
            model: "davinci-002",
            suffix: "q-a-01"
        });
        return response;
    } catch (e) {
        return { status: 400, data: e };
    }

}

module.exports = {
    createFineTune
}
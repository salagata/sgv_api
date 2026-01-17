const fs = require("fs").promises;

async function readJson(path) {
    return JSON.parse(await fs.readFile(path));
}

async function writeJson(path,content) {
    await fs.writeFile(path,JSON.stringify(content));
}

async function editJson(path,edit) {
    const json = JSON.parse(await fs.readFile(path));

    await fs.writeFile(path,JSON.stringify(Object.assign(json,edit)));
}

async function deleteJsonProperty(path,property) {
    const json = JSON.parse(await fs.readFile(path));
    delete json[property];
    await fs.writeFile(path,JSON.stringify(json));
}

module.exports = { readJson, writeJson, editJson, deleteJsonProperty};
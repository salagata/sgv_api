const { filterProperties } = require("../utils/object");
const fs = require("fs").promises;

async function getEffecs(match = "") {
    const effects = JSON.parse(await fs.readFile("../effects.json"));
    if(match) {
        const searchFor = match.trim().replaceAll(/\s+/g," ");
        filterProperties(effects,(k,v) => v.includes(searchFor));
    }
    return outputMessages;
}

async function getEffectList(match = "") {
    let effectList = Object.keys(JSON.parse(await fs.readFile("../effects.json")));
    if(match) {
        const searchFor = match.trim().replaceAll(/\s+/g," ");
        effectList = effectList.filter(effect => effect.includes(match));
    }
    
    return effectList
}

async function getEffect(effectName) {
    const effects = JSON.parse(await fs.readFile("../effects.json"));
    return effects[effectName];
}
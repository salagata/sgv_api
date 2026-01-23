const { filterProperties } = require("../utils/object");
const { sanitize } = require("../utils/sanitize");
const { readJson, editJson, deleteJsonProperty } = require("../utils/jsonFile");
const fs = require("fs").promises;


/**
 * Gets a set of the effects
 *
 * @async
 * @param {string} [match=""] Additional match searcher
 * @returns {object} an object with the effects, and information about them, void object if no matches
 */
async function getEffects(match = "") {
    let effects = await readJson("./effects.json");
    if(match !== "") {
        const searchFor = match.trim().replaceAll(/\s+/g," ");
        effects = filterProperties(effects,(k,v) => k.includes(searchFor));
        if(Object.keys(effects).length === 0) {
            throw new Error(`No effects matching with "${searchFor}" were found.`)
        }
    }
    return effects
}


/**
 * Gets a list of all the avaiable effects
 *
 * @async
 * @param {string} [match=""] Additional match searcher
 * @returns {[string]} List of the effects
 */
async function getEffectList(match = "") {
    let effectList = Object.keys(await readJson("./effects.json"));
    if(match) {
        const searchFor = sanitize(match);
        effectList = effectList.filter(effect => effect.includes(searchFor));
        if(effectList.length === 0) {
            throw new Error(`No effects matching with "${searchFor}" were found.`)
        }
    }
    return effectList
}


/**
 * Gets an effect
 *
 * @async
 * @param {string} effectName Name of the effect
 * @returns {object} An object containing information about the object
 */
async function getEffect(effectName) {
    const effects = await readJson("./effects.json");
    const searchFor = sanitize(effectName);
    const effect = effects[searchFor];
    if(!effect) {
        throw new Error(`Unknown effect: ${searchFor}.`)
    }
    return effect
}

async function addEffect(effectName,code,effectArgs = 0,author = "<@1005205558497906839>") {
    const params = new Array(effectArgs).fill(0).map((x,i) => `{arg:${i+1}}`);
    const effect = {}
    effect[sanitize(effectName)] = {
        "code": code,
        "params": params,
        "args": effectArgs,
        "author": author
    }
    await editJson("./effects.json",effect);
    return effect
}

async function deleteEffect(effectName) {
    await deleteJsonProperty("./effects.json",sanitize(effectName));
}

/**
 * Checks if an effect exists
 *
 * @async
 * @param {string} effectName Name of the effect
 * @returns {boolean} If the effect exist
 */
async function checkEffect(effectName) {
    const effects = await readJson("./effects.json");
    const searchFor = sanitize(effectName);
    const effect = effects.hasOwnProperty(searchFor);
    return effect;
}

module.exports = {
    getEffect, getEffectList, getEffects, addEffect, deleteEffect, checkEffect
}
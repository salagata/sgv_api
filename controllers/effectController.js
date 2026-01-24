const Effect = require("../models/Effect");
const EffectGenerators = require("../models/Generators");
const { AppError } = require("../utils/errorHandler");

const splitAnyPitches = (req,res) => {
    const length = req.params?.length ?? "";
    const effect = EffectGenerators.splitAnyPitches(parseInt(length));
    res.status(200).json(effect);
}

const multiGradientMap = (req,res) => {
    const length = req.params?.length ?? "";
    const effect = EffectGenerators.multiGradientMap(parseInt(length));
    res.status(200).json(effect);
}

const getEffects = async (req,res,next) => {
    const match = req.query?.match ?? "";
    try {
        const effect = await Effect.getEffects(match); 
        res.status(200).json(effect);
    } catch(e) {
        next(new AppError(404, e));
    }
}

const getEffect = async (req,res,next) => {
    const match = req.params?.effect ?? "";
    const length = req.query?.length ?? "";
    try {
        const effect = await Effect.getEffect(match); 
        if(!effect?.generated) {
            res.status(200).json(effect);
        } else {
            switch (match) {
                case "split any pitches":
                    res.redirect("/api/v1/effects/object/sap/"+length)
                    break;
                
                case "multi gradient map":
                    res.redirect("/api/v1/effects/object/mgm/"+length)
                    break;
            }
        }
    } catch(e) {
        next(new AppError(404, e));
    }
}

const getEffectList = async (req,res,next) => {
    const match = req.query?.match ?? "";
    try {
        const effect = await Effect.getEffectList(match); 
        res.status(200).json(effect);
    } catch {
        next(new AppError(404, "Effects doesn't exist"));
    }
}

const addEffect = async (req,res) => {
    const effect = Object.assign({
        "code":"",
        "args": 0,
        "author": "<@1005205558497906839>"       
    },req.body)
    const added = await Effect.addEffect(effect.name, effect.code, effect.args, effect.author);
    res.status(200).json(added);
}

const removeEffect = async (req,res,next) => {
    const match = req.params?.effect ?? "";
    if(await Effect.checkEffect(match)) {
        await Effect.deleteEffect(match);
        res.status(200).json({
            "fulfilled":true
        })
    } else {
        next(new AppError(404, `Effect ${match} doesn't exist`));
    }
}

const headEffect = async (req,res) => {
    const match = req.params?.effect ?? "";
    res.status(200).json({
        "name": match,
        "exist": await Effect.checkEffect(match)
    })
}

module.exports = { getEffect, getEffects, getEffectList, addEffect, removeEffect, headEffect, splitAnyPitches, multiGradientMap}
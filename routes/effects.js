const express = require("express");
const router = express.Router();
const { getEffect, getEffectList, getEffects, addEffect, removeEffect, headEffect } = require("../controllers/effectController");

router.get("/object",getEffects);
router.get("/list",getEffectList);
router.get("/list/:effect",getEffect);
router.post("/list",addEffect);
router.delete("/list/:effect",removeEffect);
router.head("/list/:effect",headEffect);

module.exports = router
const express = require("express");
const router = express.Router();
const { getRandomMessage, getTotalMessages } = require("../controllers/messageController");

router.get("/",getRandomMessage);
router.get("/total",getTotalMessages)

module.exports = router;
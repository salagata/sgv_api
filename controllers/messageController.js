const Message = require("../models/Message");
const { AppError } = require("../utils/errorHandler");

const getRandomMessage = (req,res,next) => {
    const index = req.query?.index ?? -1;
    const message = Message.getRandomOutputMessage(index);
    if(!message) {
        next(new AppError(404, "Message not found"))
    } else {
        res.status(200).json(message);
    }
}

const getTotalMessages = (req,res) => {
    const amount = Message.getTotalOutputMessages();
    res.status(200).json(amount);
}

module.exports = { getRandomMessage, getTotalMessages}
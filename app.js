require("dotenv").config();

const express = require("express")
const app = express();

const messageRouter = require("./routes/message");
const effectsRouter = require("./routes/effects");
const { errorHandler } = require("./middleware/error");
const { authenticate } = require("./middleware/auth");

const PORT = process.env.PORT;

app.use(express.json());
app.use(authenticate)
app.use("/api/v1/message",messageRouter);
app.use("/api/v1/effects",effectsRouter);

app.use(errorHandler)

app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
})
const express = require("express")
const app = express();
const PORT = 8080;

app.get("/",(req,res) => {
    res.setHeader("Content-Type","text/html");
    res.write(`<html>
            <h1>hello</h1>
        </html>`)
    res.send()
})

app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
})
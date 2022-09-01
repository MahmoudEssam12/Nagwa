const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const wordsRouter = require("./Routers/wordsRouter");
const rankRouter = require("./Routers/rankRouter")
const app = express();


app.listen(8080, () => {
    console.log("listening on port 8080")
});


//Middlewares
app.use((req, res, next) => {
    console.log(req.method, req.url);
    // response.send("  Heloo First MW");
    next();
});


app.use(cors({ origin: true }))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
app.use(wordsRouter);
app.use(rankRouter)

// Not Found middleware
app.use((request, response) => {
    response.status(404).json({ data: "Not Found" })
});

// Error MW
app.use((error, request, response, next) => {
    let status = error.status || 500;
    response.status(status).json({ Error: error + "" });
});
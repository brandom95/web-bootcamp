import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));



const loggingMiddleware = (req, res, next) => {
    const submitBtn = req.body.password;
    if (submitBtn === "ImAwesome") {
        return res.sendFile(__dirname + "/public/secret.html");
    }
    next();
};
app.use(loggingMiddleware);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", loggingMiddleware, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log(`running port on ${port}`);
});
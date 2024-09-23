import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//ejs config 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get("/", (req, res) => {
    const birthday = new Date();
    const dayWeek = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"];
    const day1 = birthday.getDay();

    res.render("index", {
        name: ` ${dayWeek[day1]} `
    });
});

app.post("/", (req, res) => {
    res.render("index", {
        name: req.body["name"]
    });
});

//listen port
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

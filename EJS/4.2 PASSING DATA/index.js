import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get("/", (req, res) => {


  res.render("index.ejs", {
    fname: null,
    lastName: null,
    message: "<strong> Enter your name below✌️ </strong>",
    message2: null

  });
});

app.post("/submit", (req, res) => {
  const fname = req.body["fName"];
  const lastName = req.body["lName"];

  res.render("index", {
    fname: fname,
    lastName: lastName,
    message: null,
    message2: `<strong> your name have ${fname.length + lastName.length} letters </strong>`
  });

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

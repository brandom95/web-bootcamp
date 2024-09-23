import express from "express";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));

const logger = (req, res, next) => {
  if (req.method === "POST") {
    const userInputStreet = req.body.street;
    const userInputPet = req.body.pet;

    console.log('requested input', [userInputPet, userInputStreet]
    );

    if (!userInputStreet || !userInputPet) {
      return res.status(400).send('Both fields are required !');
    }
  }
  next();
};

app.use(logger);

app.post("/submit", logger, (req, res) => {
  const userInputStreet = req.body.street;
  const userInputPet = req.body.pet;
  res.send(`<h1> Your band name is: </h1> <h2>${userInputStreet}${userInputPet} 👌</h2>`)
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

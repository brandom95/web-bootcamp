import express from "express";

const app = express();
const port = 3000;

function branLogger(req, res, next) {
  console.log("request method:", req.method);
  console.log("request URL:", req.url);

  next();
}

app.use(branLogger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import express from "express";
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>express rules</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>4388610576</h1>");
});

app.listen(port, () => {
  console.log(`youre connected to the port ${port}`);
});

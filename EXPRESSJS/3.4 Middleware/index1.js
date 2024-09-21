import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));
const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

const app = express();
app.use(express.json());

const port = 3000;

const mockUsers = [
  { id: 1, username: "anson", displayName: "An" },
  { id: 2, username: "jack", displayName: "Jack" },
  { id: 3, username: "jhon", displayName: "Jhon" },
];

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

// get status

app.get("/", (req, res) => {
  res.status(201).send({ msg: "hello" });
});

// get accessing the users

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.send(mockUsers);
});

//post request for posting data

app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

// get the id from the user in INT
// wrong id message

app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "bad request. Invalid ID" });
  }

  const findMe = mockUsers.find((user) => user.id === parsedId);
  if (!findMe) return res.sendStatus(404);
  return res.send(findMe);
});

// another unused get method for groceries

app.get("/api/products", (req, res) => {
  res.send([
    { id: 1, product: "milk", displayStock: "2" },
    { id: 2, product: "egg", displayStock: "5" },
    { id: 3, product: "apple", displayStock: "10" },
  ]);
});

// put method for udpate whole object
app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return res.sendStatus(404);

  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return res.sendStatus(200);
});

//patch method for single section of the object

app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

//delete function

app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);

  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});

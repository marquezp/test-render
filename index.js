require("dotenv").config();
const express = require("express");
const Person = require("./models/person");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(requestLogger);
app.use(morgan(":method :url :status - :response-time ms :body"));

// Custom token to log request body
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.get("/", (req, res) => {
  res.send("<h1>use /api/persons to get data</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    response.json(person);
  });
});

app.get("/info", (req, res) => {
  const size = data.length;
  const date = Date();
  const message = `Phonebook has info for ${size} people<br/>${date}`;
  res.send(message);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }

  if (persons.find((person) => person.name === body.name)) {
    console.log("person exists");

    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = new Person({
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    phone: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
    res.status(201).end();
  });
});

// app.delete("/api/persons/:id", (req, res) => {
//   Person.findById(req.params.id).then(person => {
//     express.response,
//   })
//   res.status(204).end();
// });

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

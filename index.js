require("dotenv").config();
const express = require("express");
const connetToDb = require("./database/db");

const app = express();
const port = process.env.PORT || 3000;

connetToDb();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

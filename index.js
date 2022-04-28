const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

const books = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/books.json`, {
    encoding: "utf-8",
  })
);
const users = JSON.parse(`${__dirname}/dev-data/data/users.json`, {
  encoding: "utf-8",
});

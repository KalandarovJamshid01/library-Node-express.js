const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

const books = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/books.json`, {
    encoding: "utf-8",
  })
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/users.json`, {
    encoding: "utf-8",
  })
);
const getBooks = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      books,
    },
  });
};
const getUsers = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      users,
    },
  });
};
const addBook = (req, res) => {
  const data = req.body;
  const newId = books[books.length - 1].id + 1;
  const complete = Object.assign({ id: newId }, data);
  books.push(complete);
  fs.writeFile(
    `${__dirname}/dev-data/data/books.json`,
    JSON.stringify(books),
    "utf-8",
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          books: complete,
        },
      });
    }
  );
};
const addUser = (req, res) => {
  const data = req.body;
  const newId = users[users.length - 1].id + 1;
  const complete = Object.assign({ id: newId }, data);
  users.push(complete);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    "utf-8",
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          users: complete,
        },
      });
    }
  );
};
const getBooksItem = (req, res) => {
  const id = +req.params.id;
  const data = books.find((val) => val.id === id);
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
};
const getUsersItem = (req, res) => {
  const id = +req.params.id;
  const data = users.find((val) => val.id === id);
  res.status(200).json({
    status: "success",
    data: {
      data,
    },
  });
};
const deleteBook = (req, res) => {
  const id = +req.params.id;
  const arr = books.filter((val) => val.id != id);
  fs.writeFile(
    `${__dirname}/dev-data/data/books.json`,
    JSON.stringify(arr),
    "utf-8",
    (err) => {
      res.status(204).json({
        status: "success",
        data: "Ochirildi",
      });
    }
  );
};
const deleteUser = (req, res) => {
  const id = +req.params.id;
  const arr = users.filter((val) => val.id != id);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(arr),
    "utf-8",
    (err) => {
      res.status(204).json({
        status: "success",
        data: "Ochirildi",
      });
    }
  );
};
app.route("/api/v1/books").get(getBooks).post(addBook);
app.route("/api/v1/books/:id").get(getBooksItem).delete(deleteBook);
app.route("/api/v1/users").get(getUsers).post(addUser);
app.route("/api/v1/users/:id").get(getUsersItem).delete(deleteUser);
const port = 8000;
app.listen(port, "127.0.0.1");

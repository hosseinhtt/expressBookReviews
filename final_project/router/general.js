const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) {
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: `User ${username} successfully registred. Now you can login` });
      } else {
        return res.status(404).json({ message: "User already exists!" });
      }
    }
    return res.status(404).json({ message: "Unable to register user." });
  });

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn])
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const author = req.params.author;
  const booksByAuthor = []

  for (const key in books) {
    if (books[key].author === author) {
      booksByAuthor.push({
        id: key,
        title: books[key].title,
        reviews: books[key].reviews,
      });
    }
  }

  if (booksByAuthor.length === 0) {
    res.status(404).json({ message: 'No books found for the author' });
  } else {
    res.json({ books: booksByAuthor });
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title;
  const booksByTitle = []

  for (const key in books) {
    if (books[key].title === title) {
      booksByTitle.push({
        id: key,
        author: books[key].author,
        reviews: books[key].reviews,
      });
    }
  }

  if (booksByTitle.length === 0) {
    res.status(404).json({ message: 'No books found for the title' });
  } else {
    res.json({ books: booksByTitle });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;

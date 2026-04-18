const Book = require("./models/Book");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

// Add Book
app.post("/addBook", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
});

// Get Books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// Issue Book
app.put("/issue/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, { available: false });
  res.send("Book Issued");
});

// Return Book
app.put("/return/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, { available: true });
  res.send("Book Returned");
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
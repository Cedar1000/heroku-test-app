const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

//MODEL
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'a book must have a title'],
  },

  author: {
    type: String,
    required: [true, 'a book must have an author'],
  },

  bookUrl: {
    type: String,
    required: [true, 'a book must have a url'],
  },

  published: {
    type: String,
    required: [true, 'a book must have a publisher name'],
  },

  imageUrl: {
    type: String,
  },

  description: {
    type: String,
    required: [true, 'a book must have a description'],
  },
});

const Book = mongoose.model('Book', bookSchema);

//Get All Books
app.get('/api/v1/books', async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      status: 'success',
      books,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;

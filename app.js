const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

//Error Class

class appError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = this.statusCode;
  }
}

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

  publisher: {
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
      results: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error,
    });
  }
});

//Add A book to DB
app.post('/api/v1/books', async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      bookUrl: req.body.bookUrl,
      publisher: req.body.publisher,
      description: req.body.description,
    });

    res.status(200).json({
      status: 'success',
      book,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error,
    });
  }
});

//Get a single book from DB
app.get('/api/v1/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).json({
        status: 'error',
        message: 'No book was found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      book,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error,
    });
  }
});

//Delete a book from DB
app.delete('/api/v1/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'Delete Successful',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error,
    });
  }
});

module.exports = app;

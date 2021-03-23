const mongoose = require('mongoose');

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

  cloudinaryId: {
    type: String,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

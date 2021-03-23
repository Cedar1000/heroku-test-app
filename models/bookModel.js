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

  published: {
    type: Number,
    required: [true, 'a book must have a published year'],
  },

  image: {
    type: String,
  },

  bookUrl: {
    type: String,
    required: [true, 'a book must have an imageUrl'],
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

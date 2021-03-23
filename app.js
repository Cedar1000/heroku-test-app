const express = require('express');
const app = express();
const cors = require('cors');
const Book = require('./models/bookModel');
const upload = require('./utils/multer');
const cloudinary = require('./utils/cloudinary');
const path = require('path');

app.use(express.json());
app.use(cors());

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

app.get('/', (req, res) => {
  res.send('Hello world');
});

//Add A book to DB
app.post('/api/v1/books', upload.single('image'), async (req, res) => {
  try {
    const yearDigits = req.body.published.split('').length;

    if (yearDigits !== 4) {
      return res.status(403).json({
        status: 'error',
        message: 'A year should be 4 digits',
      });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      bookUrl: req.body.bookUrl,
      published: req.body.published,
      description: req.body.description,
      image: result.secure_url,
      cloudinaryId: result.public_id,
    });

    res.status(200).json({
      status: 'success',
      book,
      result,
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

//Edit an existing book in DB
app.patch('/api/v1/books/:id', upload.single('image'), async (req, res) => {
  try {
    console.log(req.params.id);
    //Get book from DB
    const book = await Book.findById(req.params.id);

    //Delete former image from cloudinary
    await cloudinary.uploader.destroy(book.cloudinaryId);

    //Upload new image
    const result = await cloudinary.uploader.upload(req.file.path);

    const data = {
      title: req.body.title || book.title,
      author: req.body.author || book.author,
      bookUrl: req.body.bookUrl || book.bookUrl,
      publisher: req.body.publisher || book.publisher,
      description: req.body.description || book.description,
      image: result.secure_url || book.image,
      cloudinaryId: result.public_id || book.cloudinaryId,
    };

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    console.log(updatedBook);

    res.status(200).json({
      status: 'success',
      updatedBook,
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
    const book = await Book.findById(req.params.id);

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(book.cloudinaryId);

    //Delete from DB
    await Book.deleteOne(book);

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

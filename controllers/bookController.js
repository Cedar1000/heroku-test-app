const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Book = require('../models/bookModel');

//Get All Books from server
exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    status: 'success',
    results: books.length,
    books,
  });
});

//Get a single book from DB
exports.getSingleBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) return next(new AppError('No book was found with that ID', 404));

  res.status(200).json({
    status: 'success',
    book,
  });
});

//Add A book to DB
exports.addBook = catchAsync(async (req, res, next) => {
  const publishedString = JSON.stringify(req.body.published);

  const yearDigits = publishedString.split('').length;

  if (yearDigits !== 4)
    return next(new AppError('A year should be 4 digits', 403));

  const book = await Book.create({
    title: req.body.title,
    author: req.body.author,
    bookUrl: req.body.bookUrl,
    image: req.body.image,
    published: req.body.published,
    description: req.body.description,
  });

  res.status(200).json({
    status: 'success',
    book,
  });
});

exports.editBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) return next(new AppError('No book with that ID', 404));

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    updatedBook,
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  await Book.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'Delete Successful',
  });
});

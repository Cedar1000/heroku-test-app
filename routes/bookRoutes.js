const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.route('/').get(bookController.getAllBooks).post(bookController.addBook);

router
  .route('/:id')
  .get(bookController.getSingleBook)
  .patch(bookController.editBook)
  .delete(bookController.deleteBook);

module.exports = router;

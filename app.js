const express = require('express');
const app = express();
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRoutes');

app.use(express.json());
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api/v1/books', bookRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

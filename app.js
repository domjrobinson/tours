const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE
//  * SET SECURITY HTTP HEADERS
app.use(helmet());

// * DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// * RATE LIMITING
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour'
});
app.use('/api', limiter);

// * BODY PARSER
app.use(express.json({ limit: '10kb' }));

// * Data Sanatization NOSQL
app.use(mongoSanitize());

// * Data Sanatization XSS
app.use(xss());

// * Prevent Paramenter Polution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuanitiy',
      'ratingsAVg',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// * SERVE STATIC FILES
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware    ');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl}`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl}`));
});

app.use(globalErrorHandler);

module.exports = app;

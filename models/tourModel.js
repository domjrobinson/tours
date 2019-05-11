const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      trim: true,
      unique: true
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a max group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour should have a difficulty']
    },
    ratingsAvg: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'a tour must have a price']
    },
    discount: { type: Number },
    summary: {
      type: String,
      required: [true, 'A tour must have a description'],
      trim: true
    },
    description: { type: String },
    imageCover: {
      type: String,
      require: [true, 'A tour must have a image cover']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTours: {
      type: Boolean,
      default: false
    }
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationweeks').get(function() {
  return this.duration / 7;
});

// Document Middleware / run before .save and .create
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function(next) {
//   console.log('will save document');
//   next();
// });

// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// Query Middleware

// tourSchema.pre('find', function(next) {
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTours: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds `);
  console.log(docs);

  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

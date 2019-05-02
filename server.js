const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app.js');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    console.log(con.connections);
    console.log('DB connection successful');
  });

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a price'],
    unique: true
  },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, required: [true, 'a tour must have a price'] }
});

const Tour = mongoose.model('Tour', tourSchema);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

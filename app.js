const fs = require('fs');
const express = require('express');

const app = express();

const PORT = 3000;

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Routes
app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', results: tours.length, data: { tours } });
});

app.post('/api/v1/tours', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

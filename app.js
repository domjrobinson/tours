const express = require('express');

const app = express();

const PORT = 3000;

//Routes
app.get('/', (req, res) => {
  res.status(200).send('Hello from the server');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

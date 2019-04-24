const express = require('express');

const app = express();

const PORT = 3000;

//Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server', app: 'natours' });
});
app.get('/', (req, res) => {
  res.send('you can post to this endpoint');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const dotenv = require('dotenv');
const app = require('./app.js');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

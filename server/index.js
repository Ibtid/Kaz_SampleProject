require('dotenv').config();
const app = require('./server');

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server started on port: ', PORT);
});

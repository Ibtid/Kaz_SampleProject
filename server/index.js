const app = require('./server');

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server started on port: ', 5000);
});

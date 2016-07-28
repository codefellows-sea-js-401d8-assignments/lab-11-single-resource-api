const server = require('./server');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Make mongoose use native promises
mongoose.connect('mongodb://localhost/pokemon');

const port = 3141;

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

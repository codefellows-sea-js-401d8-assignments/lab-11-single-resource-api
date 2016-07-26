const server = require('./server');

const port = 3141;

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

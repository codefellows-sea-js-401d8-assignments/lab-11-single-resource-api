const server = require('./server');

module.exports = exports = server.listen(3003, () => console.log('Server On'));

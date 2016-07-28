'use strict';

module.exports = exports = function(req, res) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      try {
        if (body === '') {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.write('400 No body found\n');
          res.end();
        }
        let parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch (e) {
        reject(e);
      }
    });
  });
};

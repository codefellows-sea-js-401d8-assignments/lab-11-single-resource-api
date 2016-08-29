'use strict';

module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      try {
        let parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } catch(err) {
        reject(err);
      }
    });
  });
};

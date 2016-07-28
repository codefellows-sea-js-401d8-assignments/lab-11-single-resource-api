'use strict';

const url = require('url');

module.exports = exports = function(req) {
  return new Promise((resolve, reject) => {
    let parsed = url.parse(req.url, true);
    try {
      resolve(parsed);
    } catch (e) {
      reject(e);
    }
  });
};

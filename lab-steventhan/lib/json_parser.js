'use strict';

let jsonParser = (req) => {
  return new Promise((resolve, reject) => {
    let jsonString = '';
    req.on('data', (data) => {
      jsonString += data;
    });
    req.on('end', () => {
      try {
        let jsonObj = JSON.parse(jsonString);
        resolve(jsonObj);
      } catch (e) {
        reject(e);
      }
    });
  });
};

module.exports = jsonParser;

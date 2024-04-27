const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const db = {};

exports.mongoSync = () => {
  console.log('Syncing Collections...');
  fs
    .readdirSync(`${__dirname}/../src/`)
    .filter((file) => (
      file.indexOf('.') === -1
      && file !== 'index.js'
      && file.slice(-3) !== '.js'
      && file.indexOf('.test.js') === -1
    ))
    .forEach((folder) => {
      fs
        .readdirSync(`${__dirname}/../src/${folder}`)
        .filter((file) => (
          file !== 'index.js'
          && file.slice(-9) === '.model.js'
        )).forEach((file) => {
          const model = require(path.join(__dirname, `/../src/${folder}/`, file));
          db[model.modelName] = model;
        });
    });
};

exports.db = db;

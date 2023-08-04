const fs = require('node:fs');

const dirContents = (fs.readdirSync(__dirname)).filter((file) => file.endsWith('.js') && !file.match(/^index.js$/));

module.exports = dirContents.reduce((commands, fileName) => {
  commands[fileName.replace('.js', '')] = require(`./${fileName}`);
  return commands;
}, {});

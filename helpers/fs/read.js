const fs = require('fs/promises');

const read = async () => {
  const talker = await fs.readFile('talker.json', { encoding: 'utf8' });
  return JSON.parse(talker);
};

module.exports = {
  read,
};
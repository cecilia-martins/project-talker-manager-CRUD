const fs = require('fs/promises');

const read = async () => {
try {
  const talker = await fs.readFile('talker.json', { encoding: 'utf8' });
  return JSON.parse(talker);
} catch (error) {
  console.error(error);
}
};

module.exports = {
  read,
};
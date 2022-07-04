const fs = require('fs/promises');

const write = async (data) => {
  try {
    await fs.writeFile('talker.json', JSON.stringify(data));
  } catch (error) {
    // console.error(error);
    console.log(error);
  }
};

module.exports = {
  write,
};

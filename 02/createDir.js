const fs = require('fs');
const { promisify } = require('util');
const mkdir = promisify(fs.mkdir);

/**
 * Функция создает директорию, если ее не существует
 * @param dirPath {string} - путь к папке
 */

const createDir = async (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      await mkdir(dirPath);
      console.log(`Directory ${dirPath} created`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createDir;

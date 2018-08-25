const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 * Функция копирует файл в заданную директорию
 * @param oldPath {string} - откуда копируем файл
 * @param newPath {string} - куда копируем файл
 */

const copyFile = async (oldPath, newPath) => {
  try {
    const data = await readFile(oldPath);
    await writeFile(newPath, data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = copyFile;

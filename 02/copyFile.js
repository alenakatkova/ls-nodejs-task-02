const fs = require('fs');
const util = require('util');
// const path = require('path');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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
  // fs.readFile(oldPath, (err, data) => {
  //   if (err) {
  //     console.log('File read error');
  //   }
  //   fs.writeFile(newPath, data, err => {
  //     if (err) {
  //       console.log('File copy error');
  //     }
  //   });
  // });
};

//  copyFile(path.join(__dirname, '/test/inner-01/abc.png'), path.join(__dirname, '/test/abc.png'));
module.exports = copyFile;

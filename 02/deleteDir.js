const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);

/**
 * Функция удаляет заданную директорию и все файлы в ней
 * @param base {string} - название директории
 */

const deleteDir = async (base) => {
  try {
    // Путь к базовой директории
    let baseDir = path.join(__dirname, base);

    // Получаем список всех файлов и папок в базовой директории
    const files = await readdir(baseDir);

    // Удаляем файлы
    for (const file of files) {
      let localBase = path.join(base, file);
      let state = await stat(localBase);
      state.isDirectory() ? await deleteDir(localBase) : await unlink(localBase);
    }

    // Удаляем директории
    console.log('Deleting directory: ' + baseDir);
    await rmdir(baseDir);
  } catch (err) {
    console.log(err);
  }
};

module.exports = deleteDir;

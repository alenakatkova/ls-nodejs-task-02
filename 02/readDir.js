const fs = require('fs');
const path = require('path');
const copyFile = require('./modules/copyFile');
const createDir = require('./modules/createDir');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * Функция просматривает все файлы и папки в базовой папке и копирует картинки в новую папку
 * @param base {string} - имя папки, из которой копируем картинки
 * @param destination {string} - имя папки, в которую копируем картинки
 */

const readDir = async (base, destination) => {
  // Получаем путь до базовой и конечной папок
  let baseDir = path.join(__dirname, base);
  let destDir = path.join(__dirname, destination);

  // Получаем список всех файлов и папок в базовой папке
  const files = await readdir(baseDir);

  // Создаем конечную папку, если она не была создана ранее
  await createDir(destDir);

  for (const file of files) {
    // Проверяем, не является ли файл/папка срытым(ой)
    if (file.charAt(0) !== '.') {
      let localBase = path.join(base, file);
      let state = await stat(localBase);

      if (state.isDirectory()) {
        await readDir(localBase, destination);
      } else {
        // Определяем папку каталога, в которой будет лежать картинка. Создаем эту папку, если ее нет
        let catalogDirName = file.charAt(0).toUpperCase();
        let catalogDir = path.join(destDir, catalogDirName);
        await createDir(catalogDir);

        // Копируем картинку из базовой папки в папку каталога
        const imgNewPath = path.join(catalogDir, file);
        await copyFile(localBase, imgNewPath);
        console.log(`File "${file}" copied to dir "${catalogDirName}"`);
      }
    }
  }
};

module.exports = readDir;

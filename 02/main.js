const fs = require('fs');
const path = require('path');
const readDir = require('./readDir');
const deleteDir = require('./deleteDir');

// Введенные пользователем аргументы
const userArgv = process.argv.slice(2);
const base = userArgv[0];
const destination = userArgv[1];
const oldDirDelete = userArgv[2];

/**
 * Функция проверяет корректность введенных пользователем аргументов и запускает копирование файла
 */

const init = async () => {
  if (userArgv.length < 2) {
    console.log('Please enter arguments: "base dir", "destination dir" and "delete" to delete base dir after copying');
  } else if (!fs.existsSync(path.join(__dirname, base))) {
    console.log('Base directory doesn\'t exist');
  } else if (base === destination) {
    console.log('Base and destination directories must be different');
  } else if (oldDirDelete && oldDirDelete !== 'delete') {
    console.log('3rd argument must be "delete" or empty');
  } else {
    await readDir(base, destination);
    console.log('Copy done');

    switch (oldDirDelete) {
      case 'delete':
        await deleteDir(base);
        console.log('Base dir deleted');
        break;
      case undefined:
        console.log('Base dir saved');
        break;
      default:
        console.log('Something went wrong');
        break;
    }
  }
};

init();

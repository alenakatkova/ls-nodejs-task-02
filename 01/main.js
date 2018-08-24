const config = require('./config');
const getTime = require('./getTime');
const http = require('http');

http.createServer((request, response) => {
  if (request.method === 'GET' && request.url !== '/favicon.ico') {
    // Отображаем время в консоле с указанным интервалом
    let timer = setInterval(() => {
      console.log(getTime());
    }, config.TIMER);

    // Через указанное число мс останавливаем таймер и выводим время для пользователя
    setTimeout(() => {
      clearInterval(timer);
      response.write(getTime(), 'utf-8');
      response.end();
    }, config.DELAY);
  }
}).listen(config.PORT);

var express = require('express');
var path = require('path');
var winston = require('winston');

var routes = require('./routes'); // Файл с роутам
var config = require('./libs/config'); // Используемая конфигурация
var db = require('./libs/mongoose'); // Файл работы с базой MongoDB
var csv = require('ya-csv');

var app = express(); // Создаем обьект express


app.use(express.json()); // "Обучаем" наше приложение понимать JSON и urlencoded запросы
app.use(express.urlencoded());
app.use(express.methodOverride()); // Переопределяем PUT и DELETE запросы для работы с WEB формами

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// Если произошла ошибка валидации то отдаем 400 Bad Request
app.use(function (err, req, res, next) {
  console.log(err.name);
  if (err.name == "ValidationError") {
    res.send(400, err);
  } else {
    next(err);
  }
})

// Если же произошла иная ошибка то отдаем 500 Internal Server Error
app.use(function (err, req, res, next) {
  res.send(500, err);
});

// Инициализируем Handlers
var handlers = {
  warehouse: require('./handlers/warehouse'),
  entities: require('./handlers/entities'),
  csv: require('./handlers/csv'),
  product: require('./handlers/product'),
  shop: require('./handlers/shop')
}

// Метод запуска нашего сервера
function run() {
  routes.setup(app, handlers); // Связуем Handlers с Routes
  db.init(path.join(__dirname, "models"), function (err, data) {
    //Выводим сообщение об успешной инициализации базы данных
    winston.info("All the models are initialized");
    app.listen(config.get('port'), function () {
      // Сервер запущен
      winston.info("App running on port:" + config.get('port'));
    });
  });
}

if (module.parent) {
  //Если server.js запущен как модуль то отдаем модуль с методом run
  module.exports.run = run;
} else {
  //Иначе стартуем сервер прямо сейчас
  run();
}

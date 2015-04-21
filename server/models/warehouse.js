var path = require('path');

module.exports = function (mongoose) {

  //Обьявляем схему для Mongoose
    var Schema = new mongoose.Schema({
        shopId: { type: String, required: true },
        shopName: { type: String, required: true },
        size: { type: Number, required: true }
    });

  // Инициализируем модель с именем файла, в котором она находится
  return mongoose.model(path.basename(module.filename, '.js'), Schema);
};


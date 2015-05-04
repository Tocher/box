var path = require('path');

module.exports = function (mongoose) {

  //Обьявляем схему для Mongoose
    var Schema = new mongoose.Schema({
        name: { type: String, required: true },
        sku: { type: Number, required: true },
        price: { type: Number, required: true },
        image: { type: String }
    });

  // Инициализируем модель с именем файла, в котором она находится
  return mongoose.model(path.basename(module.filename, '.js'), Schema);
};


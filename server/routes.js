module.exports.setup = function (app, handlers) {
    // shop
    app.get('/v1/shop', handlers.shop.list);
    app.get('/v1/shop/:id', handlers.shop.get);
    app.post('/v1/shop', handlers.shop.create);
    app.delete('/v1/shop/:id', handlers.shop.remove);

    app.post('/v1/csv', handlers.csv.create);

    app.get('/v1/product', handlers.product.list);
    app.post('/v1/product', handlers.product.create);
    app.delete('/v1/product/:id', handlers.product.remove);

    app.get('/v1/warehouse', handlers.warehouse.list);
    app.get('/v1/warehouse/:id', handlers.warehouse.get);
    app.post('/v1/warehouse', handlers.warehouse.create);
    app.delete('/v1/warehouse/:id', handlers.warehouse.remove);

  app.get('/v1/shops', handlers.entities.list);
  app.get('/v1/entities/:id', handlers.entities.get);
  app.post('/v1/shops', handlers.entities.create);
  app.put('/v1/entities/:id', handlers.entities.update);
  app.delete('/v1/entities/:id', handlers.entities.remove);
};

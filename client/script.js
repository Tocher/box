$(document).ready(function() {
    var server = 'http://localhost:8080/v1/',
        tabProducts = $('.tab_products'),
        tabWarehouse = $('tab_warehouse'),
        tabSale = $('tab_sale'),
        tabContacts = $('tab_contacts');

    $.get(server + 'product', function(data) {
        data.forEach(function(e, i) {
            tabProducts.append('<div class="product_box">' +
                '<div class="product_name">' + e.name + '</div>' +
                '<div class="product_image"><img src="' + e.image + '"></div>' +
                '<div class="product_price">' + e.price + '</div>' +
                '<div class="product_button">Купить</div>' +
                '</div>');
        });
    });
});

$(document).ready(function() {
    var server = 'http://localhost:8080/v1/';

    // menu
    var menuLi = $('.menu').find('li');
    menuLi.click(function() {
        menuLi.removeClass('active');
        $('.content').hide();

        var tabI = $(this).data('tab');
        $(this).addClass('active');
        $('.tab'+tabI).show();
    });

    var ctx = document.getElementById("chart1").getContext("2d"),
        ctx2 = document.getElementById("chart2").getContext("2d"),
        data = [
            {
                value: 620,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Творожок"
            },
            {
                value: 1100,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Молоко"
            },
            {
                value: 456,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Сыр"
            }
        ],
        data2 = [
            {
                value: 4600,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Творожок"
            },
            {
                value: 11400,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Молоко"
            },
            {
                value: 15100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Сыр"
            }
        ],
        myPieChart = new Chart(ctx).Pie(data, {}),
        myDoughnutChart = new Chart(ctx2).Doughnut(data2);

    // tab2
    window.tab2Init = function() {
        $.get(server + 'shop', function(data) {
            var tab2List = $('.tab2').find('.list');
            tab2List.html('<tr><td>#</td><td>Название</td><td>Адрес</td><td></td><td></td></tr>');

            data.forEach(function(e, i) {
                tab2List.append('<tr data-id="'+e._id+'">' +
                '<td>' + (i + 1) +
                '</td><td>' + e.name +
                '</td><td>' + e.address +
                '</td><td><span class="del">удалить</span></td>' +
                '</td><td><span class="update">изменить</span></td>' +
                '</tr>');
            });

            $('.tab2').find('.del').click(function() {
                var id = $(this).parent().parent().data('id');
                $.ajax({
                    type: 'DELETE',
                    url: server + 'shop/' + id
                }).done(function() {
                    window.tab2Init();
                });
            });
        });
    };

    window.tab2Init();
    $('.add_shop').click(function() {
        var name = $('.shop_form_name').val(),
            address = $('.shop_form_address').val();

        $.post(server + 'shop',
            {
                name: name,
                address: address
            },
            function(data) {
                window.tab2Init();
            }
        );
    });

    // tab3 Products
    window.tab3Init = function() {
        $.get(server + 'product', function(data) {
            var tab3List = $('.tab3').find('.list');
            tab3List.html('<tr><td>#</td><td>Название продукта</td><td>SKU</td><td>Цена</td><td></td><td></td><td></td></tr>');

            data.forEach(function(e, i) {
                tab3List.append('<tr data-id="'+e._id+'">' +
                '<td>' + (i + 1) +
                '</td><td>' + e.name +
                '</td><td>' + e.sku +
                '</td><td>' + e.price +
                '</td><td>' + e.image +
                '</td><td><span class="del">удалить</span></td>' +
                '</td><td><span class="update">изменить</span></td>' +
                '</tr>');
            });

            $('.tab3').find('.del').click(function() {
                var id = $(this).parent().parent().data('id');
                $.ajax({
                    type: 'DELETE',
                    url: server + 'product/' + id
                }).done(function() {
                    window.tab3Init();
                });
            });

            $('.tab3').find('.update').click(function() {
                var id = $(this).parent().parent().data('id');
                $('.update_product').attr('data-id', id);

                $.get(server + 'product/' + id, function(data) {
                    $('.product_update_form_name').val(data[0].name);
                    $('.product_update_form_sku').val(data[0].sku);
                    $('.product_update_form_price').val(data[0].price);
                    $('.product_update_form_image').val(data[0].image);
                    $('.product_update_form').show();

                    $('.update_product').click(function() {
                        var that = this;

                        $.ajax({
                            type: 'PUT',
                            url: server + 'product/' + id,
                            data: {
                                name: $('.product_update_form_name').val(),
                                sku: $('.product_update_form_sku').val(),
                                price: $('.product_update_form_price').val(),
                                image: $('.product_update_form_image').val()
                            }
                        }).done(function() {
                            $('.product_update_form').hide();
                            window.tab3Init();
                        });
                    });
                });
            });
        });
    };

    window.tab3Init();
    $('.add_product').click(function() {
        var name = $('.product_form_name').val(),
            sku = $('.product_form_sku').val(),
            price = $('.product_form_price').val();

        $.post(server + 'product',
            {
                name: name,
                sku: sku,
                price: price
            },
            function(data) {
                window.tab3Init();
            }
        );
    });

    // tab 5 Sklad
    window.tab5Init = function() {
        $.get(server + 'warehouse', function(data) {

            var tab5List = $('.tab5').find('.list');
            tab5List.html('<tr><td>#</td><td>Название магазина</td><td>Вместимость</td><td></td><td></td></tr>');

            data.forEach(function(e, i) {
                tab5List.append('<tr data-id="'+e._id+'">' +
                '<td>' + (i + 1) +
                '</td><td>' + e.shopName +
                '</td><td>' + e.size +
                '</td><td><span class="del">удалить</span></td>' +
                '</td><td><span class="update">изменить</span></td>' +
                '</tr>');
            });

            $('.tab5').find('.del').click(function() {
                var id = $(this).parent().parent().data('id');
                $.ajax({
                    type: 'DELETE',
                    url: server + 'warehouse/' + id
                }).done(function() {
                    window.tab5Init();
                });
            });
        });
        $.get(server + 'shop', function(data) {
            var tab5_select = $('#tab5_select');
            $(tab5_select).html('');
            data.forEach(function(e) {
                $(tab5_select).append('<option value="'+ e._id +'">' + e.name + '</option>');
            });
        });
    };

    window.tab5Init();
    $('.add_warehouse').click(function() {
        var shop = $('#tab5_select').val(),
            size = $('.warehouse_form_size').val();

        $.get(server + 'shop/' + shop, function(data) {
            $.post(server + 'warehouse',
                {
                    shopId: shop,
                    shopName: data[0].name,
                    size: size
                },
                function(data) {
                    window.tab5Init();
                }
            );
        });

    });

});

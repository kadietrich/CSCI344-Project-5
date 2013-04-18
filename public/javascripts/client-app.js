(function () {
    "use strict";
    var $ = window.$,
        clickHandler,
        removeHandler,
        idAssigner,
        idCount,
        toDos,
        addHandler,
        main;
    main = function () {
        clickHandler = function (anchor) {
            anchor.click(function () {
                var target = $(this).attr('href');
                $('.active').removeClass('active');
                $(this).addClass('active');
                $('#' + target).addClass('active');
                return false;
            });
        };
        removeHandler = function (button) {
            button.click(function () {
                $(this).parent().remove();
                $(this).remove();
                return false;
            });
        };
        /*addHandler = function (form) {
            $(form).click(function () {
                var newToDo,
                    item,
                    newCategory;
                newToDo = $('#description_input').val();
                newCategory = $('#categories_input').val();
                item = '<div class="todoItems"><button class="removeButton">X</button>' + newToDo + '<p class="categories">' + newCategory + '</p></div>';
                idAssigner(item);
                $('#all').append(item);
                removeHandler($('.removeButton'));
            });
        };*/
        idAssigner = function (element) {
            element.id = idCount;
            idCount = idCount + 1;
        };
        $.getJSON('javascripts/lib/all.json', function (todos) {
            todos.forEach(function (todo) {
                idAssigner(todo);
                var item = '<div class="todoItems" id= ' + todo.id + '><button class="removeButton">X</button>' + todo.description + '<p class="categories">' + todo.categories + '</p></div>';
                $('#all').append(item);
                removeHandler($('.removeButton'));
                todo.categories.forEach(function (category) {
                    $('#' + category).append('<div class="todoItems"><button class="removeButton">X</button>' + todo.description + '</div>');
                    removeHandler($('.removeButton'));
                });
            });
        });
        clickHandler($('.tabs .tab'));
        //addHandler('#form_submit');
    };
    $(document).ready(main);
    window.main = main;
}());
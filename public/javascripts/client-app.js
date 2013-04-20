(function () {
    "use strict";
    var $ = window.$,
        clickHandler,
        removeHandler,
        idAssigner,
        idCount = 0,
        addCategory,
        addToTaskList,
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
                var currentTask = $(this).parent(),
                    currentID = currentTask.attr('data-id');
                $('[data-id=' + currentID + ']').remove();
                //currentTask.remove();
                $(this).remove();
                return false;
            });
        };
        addHandler = function (form) {
            $(form).click(function () {
                var newToDo = $('#description_input').val(),
                    newCategory = $('#categories_input').val().split(","),
                    item = {}; 
                if (newToDo === "" || newCategory === "") {
                    alert("Input boxes can't be empty.");
                } else {
                    item.description = newToDo;
                    item.categories = newCategory;
                    $.post("/items/new", item, function (response) {
                        addToTaskList(response);
                    })
                }
            });
        };
        idAssigner = function (element) {
            element.id = idCount;
            idCount = idCount + 1;
        };
        addToTaskList = function (item) {
            idAssigner(item);  
            var task = '<div class="todoItems" data-id=' + item.id + '><button class="removeButton">X</button>' + item.description + '<p class="categories">' + item.categories + '</p></div>';
            $('#all').append(task);
            removeHandler($('.removeButton'));
        }
        addCategory = function (category) {
            var heading = '<h3>' + category + '</h3>';
            $('<div id=' + category + '>' + heading + '</div>').appendTo('#categories');
        }
        $.getJSON('/items.json', function (items) {
            items.forEach(function (item) {
              addToTaskList(item);
              item.categories.forEach(function (category) {
                  addCategory(category);
                  $('<p data-id=' + item.id + '><button class="removeButton">X</button>' + item.description + '</p>').appendTo('#' + category);
                  removeHandler($('.removeButton'));
              });  
            });
        });
        clickHandler($('.tabs .tab'));
        addHandler('#form_submit');
    };
    $(document).ready(main);
    window.main = main;
}());
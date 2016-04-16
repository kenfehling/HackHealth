$(function() {
    var clickSelector = '.food img.image';
    var $answer = $('#answer');
    var $foods = $('.food');

    fetch('data.json')
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        startGame(data);
    });

    function startGame(data) {
        var foods = _.sampleSize(data, 2);

        _.each(foods, function(food, i) {
            var $el = $($foods.get(i));
            $el.find('img.image').attr('src', 'img/' + food.img);
            $el.find('img.image').attr('alt', 'img/' + food.name);
            $el.find('.name').text(food.name);
        });

        $(clickSelector).click(function(e) {
            var lowest = _.min(_.map(foods, function(f) { return f.sugar; }));
            var index = $(e.target).index(clickSelector);
            if (foods[index].sugar === lowest) {
                $answer.addClass('correct');
                $answer.text('Correct!');
            }
            else {
                $answer.addClass('wrong');
                $answer.text('Wrong');
            }
            _.each(foods, function(food, i) {
                $($foods.get(i)).find('.sugar').text(food.sugar);
            });
        });
    }
});
$(function() {
    var allFoods;
    var choices;
    var answered;
    var clickSelector = '.food img.image';
    var $choices = $('.food');
    var $answer = $('#answer');
    var $nextBtn = $('#next-btn');

    function onFoodSelect(e) {
        if (answered) {
            return;
        }
        answered = true;
        var lowest = _.min(_.map(choices, function(f) { return f.sugar; }));
        var index = $(e.target).index(clickSelector);
        if (choices[index].sugar === lowest) {
            $answer.addClass('correct');
            $answer.text('Correct!');
        }
        else {
            $answer.addClass('wrong');
            $answer.text('Wrong');
        }
        $answer.css('display', 'block');
        $choices.find('.sugar').css('display', 'block');
        _.each(choices, function(food, i) {
            $($choices.get(i)).find('.sugar').text(food.sugar + 'g / 100g');
        });
        $nextBtn.css('display', 'block');
    }

    function showQuestion() {
        answered = false;
        $answer.removeClass();
        $answer.css('display', 'none');
        $nextBtn.css('display', 'none');
        $choices.find('.sugar').css('display', 'none');
        choices = _.sampleSize(allFoods, 2);
        _.each(choices, function(food, i) {
            var $el = $($choices.get(i));
            $el.find('img.image').attr('src', 'img/' + food.img);
            $el.find('img.image').attr('alt', 'img/' + food.name);
            $el.find('.name').text(food.name);
        });
    }

    function main() {
        showQuestion();
        $nextBtn.click(showQuestion);
        $(clickSelector).click(onFoodSelect);
    }

    fetch('data.json')
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        allFoods = data;
        main();
    });
});
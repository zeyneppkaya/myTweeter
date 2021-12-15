/*
Composer Counter 
*/

$(document).ready(function () {

    $("#tweet-text").on('keyup', function () {
        let limit = 140 - $(this).val().length;
        let counter = $(this).siblings('div').find('.counter');
        counter.html(limit);
        
        if (limit < 0) {
            counter.addClass("tooLong");
        } else if (limit >= 0) {
            counter.removeClass("tooLong");
        }
    })
}); 
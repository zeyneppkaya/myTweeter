/*
Composer Counter 
*/

$(document).ready(function() {

    $('textarea').on('input', function() {
      let limit = 140;
      let tweetLength = $(this).val().length;
      let counter = $(this).siblings('div').find('.counter');
      counter.text(limit - tweetLength);
  
      if (tweetLength > limit) {
        counter.addClass('tooLong');
      } else if (tweetLength <= limit) {
        counter.removeClass('tooLong');
      }
    });
  });
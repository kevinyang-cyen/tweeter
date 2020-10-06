$(document).ready(function() {
  $("#tweet-text").on('keyup', function(evt) {
    let count = 140 - $(this).val().length;
    let counter = $(this).siblings('div').find('.counter');
    counter.html(count);

    if (count < 0) {
      counter.addClass("negative-count");
    } else if (count >= 0) {
      counter.removeClass("negative-count");
    }
  })
});
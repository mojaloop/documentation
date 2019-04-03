require(['gitbook', 'jquery'], function(gitbook, $) {
  var items = $('.swagger > ul > li');
  items.addClass('collapse');
  items.find('h3').on('click', function(event) {
    $(event.target).parent().toggleClass('collapse');
  });
});
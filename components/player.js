var $ = require('jquery');

var content = $('<button />', {
  'class' : 'play'
}).text('Play');

$('<div />', {
  class : 'player'
}).html(content);

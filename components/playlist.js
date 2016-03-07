var $ = require('jquery');

var playlist = (function () {

  var itemList = [];

  function init () {
    create();
  }

  function create () {
    var list = $('<ul />', {
      'class' : 'playlist'
    });

    var items = require.context('../audio', true, /\.mp3$/);

    items.keys().forEach(function (item) {
      var elem = $('<li />').html(
        item.substring(2, item.indexOf('.mp3'))
      );

      list.append(elem);
      itemList.push(item.substring(2));

    });

    $('body').append(list);
  }

  return {
    init : init,
    items : itemList
  };
})();

module.exports = playlist;

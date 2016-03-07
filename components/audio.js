var $ = require('jquery');

var audioApp = (function (items) {

  var domStack = {};
  var playing,
      played,
      audio;

  var init = function (items) {

    playing = 0;
    audio = items;

    var play = $('<button />', {
      'class' : 'play'
    }).text('play');

    var stop = $('<button />', {
      'class' : 'stop'
    }).text('stop');

    var skip = $('<button />', {
      'class' : 'skip'
    }).text('skip >');

    var duration = $('<div />', {
      'class' : 'duration'
    });

    var content = $('<div />', {
      'class' : 'controls'
    }).append(play)
      .append(stop)
      .append(skip)
      .append(duration);

    var controls = $('<div />', {
      class : 'player'
    }).html(content);

    document.body.appendChild(controls[0]);

    cacheDom();
    createAudio(items, playing);
    bindEvents(items);
    bindAudio();
  };

  var cacheDom = function () {
    domStack.$play = $('.play');
    domStack.$stop = $('.stop');
    domStack.$skip = $('.skip');
    domStack.$duration = $('.duration');
  };

  var bindEvents = function (audio) {
    domStack.$play.on('click', function (){
      domStack.audio.play();
    });

    domStack.$stop.on('click', function (){
      domStack.audio.pause();
    });

    domStack.$skip.on('click', function (){
      domStack.audio.pause();
      skip();
    });
  };

  var createAudio = function (audio, playing) {
    console.log(audio, playing);
    domStack.audio = new Audio('../audio/' + audio[playing] );
  };

  var bindAudio = function () {
    domStack.audio.addEventListener('timeupdate', function () {
      played = Math.round(domStack.audio.currentTime / domStack.audio.duration * 100);
      domStack.$duration.text(played + '%');

      if (domStack.audio.currentTime == domStack.audio.duration) {
        skip();
      }
    });
  };

  var skip = function () {
    playing++;
    createAudio(audio, playing);
    domStack.audio.play();
    bindAudio();
  };

  return {
    init : init
  };
})();

module.exports = audioApp;

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
      'class' : 'play_pause'
    }).text('play');

    var stop = $('<button />', {
      'class' : 'stop'
    }).text('stop');

    var skip = $('<button />', {
      'class' : 'skip'
    }).text('skip >');

    var progress = $('<div />', {'class' : 'progress'});
    var duration = $('<div />', {
      'class' : 'duration'
    }).append(progress);

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
    bindAudioEcents();
  };

  var cacheDom = function () {
    domStack.$play = $('.play_pause');
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
      domStack.audio.currentTime = 0;
    });

    domStack.$skip.on('click', function (){
      domStack.audio.pause();
      skip();
    });
  };

  /**
   * @param audio : filename
   * @param playing : index of audiotrack
   */
  var createAudio = function (audio, playing) {
    console.log(audio, playing);

    //create audioNode and append to body
    var audioElem = $('<audio />', {
      'src' : '../audio/' + audio[playing],
      'id' : 'audio-' + playing
    });
    $('body').append(audioElem);

    //setting up AudioContext
    domStack.audio = document.getElementById('audio-' + playing);
    domStack.context = new AudioContext();

  };


  var bindAudioEcents = function () {

    //waiting for Audio to be ready
    domStack.audio.addEventListener("canplay", function() {
      var audioSrc = domStack.context.createMediaElementSource(domStack.audio);

      audioSrc.connect(domStack.context.destination);
    });

    //handling Audio-Progress
    domStack.audio.addEventListener('timeupdate', function () {
      played = Math.round(domStack.audio.currentTime / domStack.audio.duration * 100);
      domStack.$duration.find('.progress').css('width', played + '%');

      //initializing next audio-track
      if (domStack.audio.currentTime == domStack.audio.duration) {
        skip();
      }
    });
  };

  //skipping audi-tracks
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

var $ = require('jquery');
var vis = require('./visualize.js');

var audioApp = (function (items) {

  var domStack = {};
  var audioStack = [];
  var audioIndex,
      alreadyPlayed,
      audio,
      audioContext;

  var init = function (items) {

    audioIndex = 0;
    audio = items;

    var play = $('<button />', {
      'class' : 'play_pause'
    }).text('play');

    var stop = $('<button />', {
      'class' : 'stop'
    }).text('pause');

    var skip = $('<button />', {
      'class' : 'skip'
    }).text('skip >');

    var skipBack = $('<button />', {
      'class' : 'skip-back'
    }).text('< skip');

    var progress = $('<div />', {'class' : 'progress'});
    var duration = $('<div />', {
      'class' : 'duration'
    }).append(progress);

    var content = $('<div />', {
      'class' : 'controls'
    })
      .append(skipBack)
      .append(play)
      .append(stop)
      .append(skip)
      .append(duration);

    var controls = $('<div />', {
      class : 'player'
    }).html(content);

    $('body').append(controls);

    cacheDom();
    createAudio(items, audioIndex);
    bindEvents(items);
    bindAudioEvents();
  };

  var cacheDom = function () {
    domStack.$play = $('.play_pause');
    domStack.$stop = $('.stop');
    domStack.$skip = $('.skip');
    domStack.$skipBack = $('.skip-back');
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
      if ( audio.length == (audioIndex + 1) ) {
        return;
      }
      domStack.audio.pause();
      audioIndex++;
      skip(audioIndex);
    });

    domStack.$skipBack.on('click', function (){
      if ( 1 == (audioIndex + 1) ) {
        return;
      }
      domStack.audio.pause();
      audioIndex--;
      skip(audioIndex);
    });
  };

  /**
   * @param audio : filename
   * @param audioIndex : index of audiotrack
   */
  var createAudio = function (audio, audioIndex) {
    console.log(audio, audioIndex);

    if ( audioStack[audioIndex] === undefined ){
      setAudio(audio, audioIndex);
      $('body').append(audioStack[audioIndex].node);
    }

    //setting up AudioContext
    domStack.audio = document.getElementById('audio-' + audioIndex);

  };

  var setAudio = function (audio, audioIndex) {

    //create audioNode and append to body
    var audioElem = $('<audio />', {
      'src' : '../audio/' + audio[audioIndex],
      'id' : 'audio-' + audioIndex
    });

    audioStack.push({
      'index' : audioIndex,
      'node' : audioElem
    });

    audioContext = new AudioContext();
  };

  var bindAudioEvents = function () {

    //waiting for Audio to be ready
    domStack.audio.addEventListener("canplay", function() {
      var audioSrc = audioContext.createMediaElementSource(this);

      audioSrc.connect(audioContext.destination);
      vis(audioContext, audioSrc);
    });

    //handling Audio-Progress
    domStack.audio.addEventListener('timeupdate', function () {
      alreadyPlayed = Math.round(domStack.audio.currentTime / domStack.audio.duration * 100);
      domStack.$duration.find('.progress').css('width', alreadyPlayed + '%');

      //initializing next audio-track
      if (domStack.audio.currentTime == domStack.audio.duration) {
        skip();
      }
    });
  };

  //skipping audi-tracks
  var skip = function (index) {
    createAudio(audio, index);
    domStack.audio.play();
    bindAudioEvents();
  };

  return {
    init : init
  };
})();

module.exports = audioApp;

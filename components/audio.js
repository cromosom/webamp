var $ = require('jquery');
var vis = require('./visualize.js');

var audioApp = (function (items) {

  var domStack = {};
  var audioStack = [];
  var audioIndex,
      audio,
      playing;

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
    domStack.$play     = $('.play_pause');
    domStack.$stop     = $('.stop');
    domStack.$skip     = $('.skip');
    domStack.$skipBack = $('.skip-back');
    domStack.$duration = $('.duration');
  };

  var bindEvents = function (audio) {

    domStack.$play.on('click', function (){
      playing.play();
    });

    domStack.$stop.on('click', function (){
      playing.pause();
    });

    domStack.$skip.on('click', function (){

      if ( audio.length == (audioIndex + 1) ) {
        return;
      }

      playing.pause();
      audioIndex++;
      skip(audioIndex);
    });

    domStack.$skipBack.on('click', function (){

      if ( 1 == (audioIndex + 1) ) {
        return;
      }

      playing.pause();
      audioIndex--;
      skip(audioIndex);
    });
  };

  /**
   * @param audio : filename
   * @param audioIndex : index of audiotrack
   */
  var createAudio = function (audio, audioIndex) {

    //create audioNode and append to body
    audio.forEach(function (item, index) {
      var audioElem = $('<audio />', {
        'src' : '../audio/' + item,
        'id' : 'audio-' + index
      });

      var audioCtx = new AudioContext();

      audioStack.push({
        'selector' : 'audio-' + index,
        'node' : audioElem,
        'audioContext' : audioCtx
      });

      $('body').append(audioStack[index].node);
    });

    playing = document.getElementById(audioStack[audioIndex].selector);

  };

  var bindAudioEvents = function () {

    audioStack.forEach(function (item, index) {

      var audioItem = document.getElementById(item.selector);

      //waiting for Audio to be ready
      audioItem.addEventListener("canplay", function() {
        item.audioSrc = item.audioContext.createMediaElementSource(this);
        item.audioSrc.connect(item.audioContext.destination);

        vis(item.audioContext, item.audioSrc, index);
      });

      //handling Audio-Progress
      audioItem.addEventListener('timeupdate', function () {
        var alreadyPlayed = Math.round(audioItem.currentTime / audioItem.duration * 100);
        domStack.$duration.find('.progress').css('width', alreadyPlayed + '%');

        //initializing next audio-track
        if (audioItem.currentTime == audioItem.duration) {
          if ( audio.length == (audioIndex + 1) ) {
            return;
          }
          audioIndex++;
          skip(audioIndex);
        }
      });

    });

  };

  //skipping audi-tracks
  var skip = function (index) {

    playing = document.getElementById(audioStack[index].selector);

    playing.play();

  };

  return {
    init : init
  };
})();

module.exports = audioApp;

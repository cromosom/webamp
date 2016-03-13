var $ = require('jquery');

/**
 * Visualiser
 * @param audioContext
 * @param audioSource
 * @param index of file
 */
var visualize = function (audioContext, source, index) {

  //setup frequency data
  var analyser = audioContext.createAnalyser();
  source.connect(analyser);

  analyser.fftSize = 128;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  //create nodes
  var vis = $('<div />', {'class' : 'viscan'});
  var vis2 = $('<div />', {'class' : 'viscan2'});
  var barSpacingPercent = 100 / analyser.frequencyBinCount;
  for (var i = 0; i < analyser.frequencyBinCount; i++) {
    $('<div />', {
      'class' : 'bar'
    })
      .appendTo(vis);
    $('<div />', {
      'class' : 'bar'
    })
      .appendTo(vis2);
  }
  $('<div />', {
    'class' : 'viscontainer' + index
  }).append(vis2)
    .append(vis)
    .appendTo('body');

  var bars = $('.viscontainer' + index + ' .viscan > .bar');
  var bars2 = $('.viscontainer' + index + ' .viscan2 > .bar');

  //render visualisation
  function renderFrame() {
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(dataArray);

     // render frame based on values in frequencyData
     var height = 500 / bars.length;
     bars.css('height', height + 'px');
     bars2.css('height', height + 'px');
     bars.each(function (index, bar) {
       bar.style.width = dataArray[index] + 'px';
     });
     bars2.each(function (index, bar) {
       bar.style.width = dataArray[index] + 'px';
     });

  }

  renderFrame();
};

module.exports = visualize;

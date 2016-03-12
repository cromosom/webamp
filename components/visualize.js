var $ = require('jquery');

var visualize = function (audioContext, source) {

  var analyser = audioContext.createAnalyser();
  source.connect(analyser);

  analyser.fftSize = 128;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  $('.viscan').remove();
  $('.viscan2').remove();
  var vis = $('<div />', {'class' : 'viscan'});
  var vis2 = $('<div />', {'class' : 'viscan2'});
  var barSpacingPercent = 100 / analyser.frequencyBinCount;
  for (var i = 0; i < analyser.frequencyBinCount; i++) {
    $('<div />', {
      'class' : 'bar'
    })
      // .css('left', i * barSpacingPercent + '%')
      .appendTo(vis);
    $('<div />', {
      'class' : 'bar'
    })
      // .css('left', i * barSpacingPercent + '%')
      .appendTo(vis2);
  }
  $('<div />', {
    'class' : 'viscontainer'
  }).append(vis2)
    .append(vis)
    .appendTo('body');

  var bars = $('.viscan > .bar');
  var bars2 = $('.viscan2 > .bar');
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

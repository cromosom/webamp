var $ = require('jquery');

var visualize = function (audioContext, source) {

  var analyser = audioContext.createAnalyser();
  source.connect(analyser);

  analyser.fftSize = 128;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  $('.viscan').remove();
  var vis = $('<div />', {'class' : 'viscan'});
  var barSpacingPercent = 100 / analyser.frequencyBinCount;
  for (var i = 0; i < analyser.frequencyBinCount; i++) {
    $('<div />', {
      'class' : 'bar'
    }).css('left', i * barSpacingPercent + '%')
      .appendTo(vis);
  }
  $('body').append(vis);

  var bars = $('.viscan > .bar');
  function renderFrame() {
     requestAnimationFrame(renderFrame);
     // update data in frequencyData
     analyser.getByteFrequencyData(dataArray);
     // render frame based on values in frequencyData

     var width = 500 / bars.length;
     bars.css('width', width + 'px');
     bars.each(function (index, bar) {
       bar.style.height = dataArray[index] + 'px';
     });

  }

  renderFrame();
};



module.exports = visualize;

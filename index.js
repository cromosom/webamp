require('./styles.css');

var moduleStack = [];

var playlist = require('./components/playlist.js');
playlist.init();
//console.log(playlist.items);
var audio = require('./components/audio.js');
audio.init(playlist.items);

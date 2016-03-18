import React from "react";
import ReactDom from "react-dom";

require('./styles.css');

var playlist = require('./components/playlist.js');
playlist.init();

var audio = require('./components/audio.js');
audio.init(playlist.items);

var vis = require('./components/visualize.js');

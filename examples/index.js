'use strict';
// run it with `node --experimental-worker index.js` on node 10
const process = require('process');
const fs = require('fs');

const img = fs.readFileSync('problem.jpg');
const thumbnail = require('./imager_worker');

thumbnail(img, 800, 800)
   .then(thumb => fs.writeFileSync('solution.jpg', thumb))
   .then(_=> process.exit(0))
   .catch(_=> process.exit(1));

setInterval(function () {
    console.log('tick/tock (50ms)');
}, 50);

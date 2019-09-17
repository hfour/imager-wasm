'use strict';
// run it with `node --experimental-worker index.js` on node 10
const process = require('process');
const fs = require('fs');

const img = fs.readFileSync('problem.jpg');
const normalize = require('./normalize_worker');

normalize(img)
   .then(normalized => fs.writeFileSync('solution.jpg', normalized))
   .then(_=> process.exit());

setInterval(function () {
    console.log('tick/tock (50ms)');
}, 50);

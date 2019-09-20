'use strict';

const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  module.exports = function thumbnail(img, width, height) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: [img, width, height]
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  };
} else {
  // this runs in a worker thread, and syncronously calls into wasm
  const m = require('../pkg/imager_wasm');
  const [img, width, height] = workerData; // this is magic
  const dstImg = m.thumbnail(img, width, height);
  parentPort.postMessage(dstImg);
}

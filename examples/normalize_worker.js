'use strict';

const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  module.exports = function normalize(img) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: img
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
  const m = require('../pkg/normalize_image_wasm');
  const srcImg = workerData; // this is magic
  const dstImg = m.normalize(srcImg);
  parentPort.postMessage(m.normalize(dstImg));
}

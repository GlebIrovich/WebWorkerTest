const self = this;

export default () => {
  self.addEventListener('message', (e) => {
    let x = 0;
    if (e) {
      console.log('Worker thread started', `time ${e.data.time}`);
      const startTime = Date.now();
      while ((Date.now() - startTime) < e.data.time) {
        x += 0.001;
      }
      console.log('Worker job completed', x);
    }
    self.postMessage(x);
  });
};

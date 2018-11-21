;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = root.process.hrtime || factory()
  } else {
    // Browser globals (root is window)
    // include process polyfil
    root.process = root.process || {}
    root.process.hrtime = root.process.hrtime || factory();
  }
}((typeof global === 'object' && global.global === global && global) ||
    (typeof window === 'object' && window.window === window && window) ||
    (typeof self === 'object' && self.self === self && self) ||
    this, function () {
  // polyfil for window.performance.now
  var performance = performance || {}
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() }

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  return function hrtime (previousTimestamp) {
    var clocktime = performanceNow.call(performance)*1e-3
    var seconds = Math.floor(clocktime)
    var nanoseconds = Math.floor((clocktime%1)*1e9)
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0]
      nanoseconds = nanoseconds - previousTimestamp[1]
      if (nanoseconds<0) {
        seconds--
        nanoseconds += 1e9
      }
    }
    return [seconds,nanoseconds]
  }
}));

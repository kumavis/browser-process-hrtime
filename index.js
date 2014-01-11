module.exports = hrtime

// polyfil for window.performance.now
var performance = window.performance || {}
var performanceNow =
  performance.now.bind(performance)       ||
  performance.now.bind(performance)       ||
  performance.mozNow.bind(performance)    ||
  performance.msNow.bind(performance)     ||
  performance.oNow.bind(performance)      ||
  performance.webkitNow.bind(performance) ||
  function(){ return (new Date()).getTime() }

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow()/10e3
  var seconds = Math.floor(clocktime)
  var nanoseconds = (clocktime%1)*10e9
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0]
    nanoseconds = nanoseconds - previousTimestamp[1]
    if (nanoseconds<0) {
      seconds--
      nanoseconds += 10e9
    }
  }
  return [seconds,nanoseconds]
}

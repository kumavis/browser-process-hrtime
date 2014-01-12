module.exports = hrtime

// polyfil for window.performance.now
var performance = window.performance || {}
var performanceNow =
  performance.now        ||
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() }
performanceNow = performanceNow.bind(performance)

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

# browser-process-hrtime

Browser shim for Node.js process.hrtime().
See [documentation at nodejs.org](http://nodejs.org/api/process.html#process_process_hrtime)

### usage
You can monkey-patch process.hrtime for your dependency graph like this
```javascript
process.hrtime = require('browser-process-hrtime')
var coolTool = require('module-that-uses-hrtime-somewhere-in-its-depths')
```

### note
This was originally pull-requested against [node-process](https://github.com/defunctzombie/node-process),
but they are trying to stay lean.

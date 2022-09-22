const Module = require('module');
const fs = require('fs');

Module._extensions['.js'] = function (module, filename) {
    let content = fs.readFileSync(filename, 'utf8');
    if (filename.includes('test')) {
        content = fs.readFileSync('./test.run.js', 'utf8');
    }
    module._compile(content, filename);
};


// test.js
require('./test.js');

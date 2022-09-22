const Module = require('module');
const fs = require('fs');

Module._extensions['.js'] = function (module, filename) {
    let content = fs.readFileSync(filename, 'utf8');
    if (filename.includes('input')) {
        content = content.replace('卡颂', '卡帅');
    }
    module._compile(content, filename);
};

// test.js
const data = require('./input.js');
console.log(data);
const fs = require('fs')
const path = require('path')

const babel = require('@babel/core')
const babylon =  require('babylon')
const parser = require('@babel/parser')
// The Babel parser (previously Babylon) is a JavaScript parser used in Babel.

const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generate  = require('@babel/generator').default

import programVisitor from './visitor';

const log = console.log.bind(null, '[instru]%c', 'color: #0f0')

const args = process.argv.slice(2)
log('process.env', process.argv, args)



function instrumentSync(code, filename, inputSourceMap) {
    if (typeof code !== 'string') {
        throw new Error('Code must be a string');
    }
    filename = filename || String(new Date().getTime()) + '.js';

    let ast = parser.parse(code)

    const ee = programVisitor(t, filename, {
        coverageVariable: 'myCov',
        // inputSourceMap: inputSourceMap
    });
    let output = {};
    const visitor = {
        Program: {
            enter: ee.enter,
            exit: function (path) {
                output = ee.exit(path);
            }
        }
    };
    // log('ast', ast)
    traverse(ast, visitor);

    const codeMap = generate(ast, { compact: false }, code);
    // this.fileCoverage = output.fileCoverage;
    // this.sourceMap = codeMap.map;
    // const cb = this.opts.sourceMapUrlCallback;

    fs.writeFileSync(`${filename.replace(/\..*?$/, '.output.js')}`, codeMap.code, {encoding: 'utf8'}, err => {
        if (err) {
            return console.error('xxxx 失败。')
        }
        console.log('>>> 成功。')
    })

    return output.code;
}
/* run */
function run() {
    const filePath = args[0]
    const code = fs.readFileSync(filePath, { encoding: 'utf8'})
    instrumentSync(code, filePath)
}

run()
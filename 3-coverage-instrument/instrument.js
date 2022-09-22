const fs = require('fs')
const path = require('path')

const babel = require('@babel/core')
const babylon =  require('babylon')
const parser = require('@babel/parser')
// The Babel parser (previously Babylon) is a JavaScript parser used in Babel.

const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generate  = require('@babel/generator').default

const instrumentPlugin  = require('./babel-plugins-instrument')

const log = console.log.bind(null, '[instru]%c', 'color: #0f0')

const args = process.argv.slice(2)
log('process.env', process.argv, args)



function instrumentSync(code, filePath, inputSourceMap) {
    if (typeof code !== 'string') {
        throw new Error('Code must be a string');
    }
    filePath = filePath || String(new Date().getTime()) + '.js';
    // codeAst = {
    //     type: "Program",
    //     // body: [].concat(gloAst.program.body, codeAst.program.body),
    //     body: gloAst.program.body.concat(codeAst.program.body),
    // };
    // let newCode = generate(codeAst).code;

    codeAst = parser.parse(code)

    const ee = programVisitor(t, filename, {
        coverageVariable: opts.coverageVariable,
        inputSourceMap: inputSourceMap
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
    // log('ast', codeAst)
    traverse(codeAst, {
            enter(path) {
                log('enter', path)
            },
            exit() {

            },
            instrumentPlugin(babel)
        }, {
            coverageVar: 'mycov',
            filePath,
            inputSourceMap: filePath
    });
    // output = generate(codeAst, { compact: false });
    // const output = babel.transformSync(code, {
    //     plugins: [
    //         [
    //             './babel-plugins-instrument',
    //             {
    //                 coverageVar: 'mycov',
    //                 filePath,
    //                 inputSourceMap: filePath
    //             }
    //         ]
    //     ]
    // });

    fs.writeFileSync(`${filePath.replace(/\..*?$/, '.output.js')}`, output.code, {encoding: 'utf8'}, err => {
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
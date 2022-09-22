const fs = require('fs')
const path = require('path')
const babylon =  require('babylon')
const parser = require('@babel/parser')
// The Babel parser (previously Babylon) is a JavaScript parser used in Babel.

// import * as t from 'babel-types';
const t = require('@babel/types')
const traverse = require('@babel/traverse').default
const generate  = require('@babel/generator').default
const vistor  = require('./vistor')

const log = console.log.bind(null, '[instru]%c', 'color: #0f0')

const args = process.argv.slice(2)
log('process.env', process.argv, args)

const gloVar = `
var aaaa = {}
`

function instrumentSync(code, filename, inputSourceMap) {
    if (typeof code !== 'string') {
        throw new Error('Code must be a string');
    }
    filename = filename || String(new Date().getTime()) + '.js';
    // const opts = this.opts;
    const opts = {
        autoWrap: true,
        esModules: "module",
        compact: false,
        produceSourceMap: true,
    }
    // const ast = babylon.parse(code, {
    const glo = `var mycov = {}`
    const gloAst = parser.parse(glo)
    let codeAst = parser.parse(code, {
        allowReturnOutsideFunction: opts.autoWrap,
        // sourceType: opts.esModules ? "module" : "script"
    });
    log('ast', codeAst)
    codeAst = {
        type: "Program",
        // body: [].concat(gloAst.program.body, codeAst.program.body),
        body: gloAst.program.body.concat(codeAst.program.body),
    };
    // let newCode = generate(codeAst).code;
    // codeAst = parser.parse(newCode)


    // const ee = programVisitor(t, filename, {
    //     coverageVariable: opts.coverageVariable,
    //     inputSourceMap: inputSourceMap
    // });
    let output = {};
    // const visitor = {
    //     Program: {
    //         enter: ee.enter,
    //         exit: function (path) {
    //             output = ee.exit(path);
    //         }
    //     }
    // };
    traverse(codeAst, {
        // enter(p) {
        //     const code = `var aaaa`

        // },
        FunctionDeclaration: function(p) {
            log('path', p)
            p.node.id.name = "x";
        },
    });

    const generateOptions = {
        compact: true,
    };
    const codeMap = generate(codeAst, generateOptions);
    // this.fileCoverage = output.fileCoverage;
    // this.sourceMap = codeMap.map;
    // const cb = this.opts.sourceMapUrlCallback;

    fs.writeFileSync('./demo.output.js', codeMap.code, {encoding: 'utf8'}, err => {

    })

    return codeMap.code;
}

/* run */
function run() {
    const fsPath = args[0]
    const code = fs.readFileSync(fsPath, { encoding: 'utf8'})
    instrumentSync(code)
}

run()
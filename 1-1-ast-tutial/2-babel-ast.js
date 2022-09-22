/**
 * babel ast 解析/结果。
 * 
 */
const babel = require('@babel/core');
const code = `
 import React from 'react';  function add(a, b) {  return a + b;  }  let str = 'hello';  `;
const ast = babel.parse(code, {
    sourceType: 'module'
});
console.log(ast.program.body);

//输出
/*
[
  Node {
    type: 'ImportDeclaration',
    start: 2,
    end: 28,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    specifiers: [ [Node] ],
    source: Node {
      type: 'StringLiteral',
      start: 20,
      end: 27,
      loc: [SourceLocation],
      extra: [Object],
      value: 'react'
    }
  },
  Node {
    type: 'FunctionDeclaration',
    start: 30,
    end: 68,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    id: Node {
      type: 'Identifier',
      start: 39,
      end: 42,
      loc: [SourceLocation],
      name: 'add'
    },
    generator: false,
    async: false,
    params: [ [Node], [Node] ],
    body: Node {
      type: 'BlockStatement',
      start: 49,
      end: 68,
      loc: [SourceLocation],
      body: [Array],
      directives: []
    }
  },
  Node {
    type: 'VariableDeclaration',
    start: 70,
    end: 88,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    declarations: [ [Node] ],
    kind: 'let'
  }
]
*/
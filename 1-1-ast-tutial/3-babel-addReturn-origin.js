/**
 * 以上⾯的代码为例，如果想在函数返回语句之前加⼊⼀⾏语句 console.log('函数执⾏完成') ，
 * 最朴素的做法是这样：
 */

 const babel = require('@babel/core');
 const code = `
   import React from 'react';
   function add(a, b) {
     const decrease = () => {
       return c;
     }
     return a + b;
   }
   let str = 'hello';
 `;
 const ast = babel.parse(code, {
   sourceType: 'module'
 });
 const CONSOLE_AST = babel.template.ast(`console.log('函数执行完成');`);
 function insertConsoleBeforeReturn(body) {
   body.forEach(node => {
     if (node.type === 'FunctionDeclaration') { // 函数关键字声明形式
       console.log(node,node.body.body)
       const blockStatementBody = node.body.body;
       if (blockStatementBody && blockStatementBody.length) {
         const index = blockStatementBody.findIndex(n => n.type === 'ReturnStatement');
         if (~index) {
           // 函数体存在语句且最后⼀条语句是 return (假设 return 就是最后的语句)
           blockStatementBody.splice(index, 0, CONSOLE_AST); // 直接修改 ast, 前插⼀个节 点
         }
       }
     }
   });
 }
 insertConsoleBeforeReturn(ast.program.body)
 console.log(babel.transformFromAstSync(ast).code);
 
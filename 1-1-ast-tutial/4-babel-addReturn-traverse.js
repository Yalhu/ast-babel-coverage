/**
 * babel traverse 修改代码。
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
 
babel.traverse(ast, {
    ReturnStatement(path) {
        path.insertBefore(CONSOLE_AST);
    }
});

console.log(babel.transformFromAstSync(ast).code);

/*
// ===== 输出 ====
import React from 'react';
function add(a, b) {
    const decrease = () => {
    console.log('函数执行完成');
    return c;
    };
    console.log('函数执行完成');
    return a + b;
}
let str = 'hello';
*/


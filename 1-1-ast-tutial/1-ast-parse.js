/**
 * 代码编译流程分析。
 */

const esprima = require('esprima');
var program = 'const answer = 42';
//词法分析
const token = esprima.tokenize(program);
console.log(token)
//语法分析
const ast = esprima.parse(program);
console.log(JSON.stringify(ast, null, '  '));

/* 
// ===== 输出结果 =====
//词法分析输出
[
  { type: 'Keyword', value: 'const' }, // keyword 关键词
  { type: 'Identifier', value: 'answer' }, // Identifier 标识符
  { type: 'Punctuator', value: '=' }, // Punctuator 标点符号
  { type: 'Numeric', value: '42' } // Numeric 数字
]
//语法分析输出
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration", //变量声明
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "answer"
          },
          "init": {
            "type": "Literal", //直译
            "value": 42,
            "raw": "42"
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "script"
}
*/
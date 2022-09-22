/**
 * 构造 CONSOLE_AST 节点也有⼏种⽅式。
 *  先使⽤在线⼯具将 console.log('函数执⾏完成'); 
 *  结构化（如果你已经⼗分熟悉这个过程，可以跳过）:
*   ```js
 *  {
        "type": "Program",
        "start": 0,
        "end": 22,
        "body": [
            {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 22,
            "expression": {
                "type": "CallExpression",
                "start": 0,
                "end": 21,
                "callee": {
                "type": "MemberExpression",
                "start": 0,
                "end": 11,
                "object": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 7,
                    "name": "console"
                },
                "property": {
                    "type": "Identifier",
                    "start": 8,
                    "end": 11,
                    "name": "log"
                },
                "computed": false,
                "optional": false
                },
                "arguments": [
                {
                    "type": "Literal",
                    "start": 12,
                    "end": 20,
                    "value": "函数执行完成",
                    "raw": "'函数执行完成'"
                }
                ],
                "optional": false
            }
            }
        ],
        "sourceType": "module"
    }
    ```
 *  
 */
/* ## 1 基础⽅式——使⽤ @babel/types 来构造语句  */
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const CONSOLE_AST = t.expressionStatement(
    t.callExpression(
        t.memberExpression(
        t.identifier('console'),
        t.identifier('log')
        ),
        [t.stringLiteral('函数执行完成')],
    )
);
console.log(JSON.stringify(CONSOLE_AST, null, '  '), '\n\n', generate(CONSOLE_AST).code);


/* ## 终极简化版——模板 API，也是上⾯表格提前给出来的⽅式： */
const template = require('@babel/template').default;
// 或 const template = require('@babel/core').template;
const CONSOLE_AST_2 = template.ast(
    `console.log('函数执⾏完成')`
);
console.log(CONSOLE_AST_2);

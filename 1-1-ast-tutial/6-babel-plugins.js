/**
 * AST 与 babel 插件
 * 随着 ECMAScript 的发展，不断涌出⼀些新的语⾔特性（如管道操作符、可选链操作符、控制合并操作符……），也包括但不限于 JSX 语法等。
 * 遇到 babel 本身的解析引擎模块不能识别新特性的问题，可以由插件来处理。
 */
// # 
/* ##1 @babel/parser 模块 + 内联配置  */
const ast = babel.parse(code, {
    sourceType: 'module',
    plugins:[
      ["pipelineOperator", {
        "proposal": "hack",
        "topicToken": "^^"
      }]
    ]
  }); 
  

/* ## 2 @babel/core模块 + ⽂件 babel.config.json 解析（babel 会⾃动到项⽬⽬录查找最近的）babel配置文件 */
/* 
```js
{
     "plugins": [
         ["@babel/plugin-proposal-pipeline-operator", {
             "proposal": "hack",
             "topicToken": "^^"
         }]
     ]
 }

```

*/
  


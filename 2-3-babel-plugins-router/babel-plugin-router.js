var fs = require('fs');
// let babel = require('babel-core');
// let t = require('babel-types');
let babel = require('@babel/core');
let t = require('@babel/types');
let template = require('@babel/template');
// 读取需要修改的源代码内容
var content = fs.readFileSync('./route.js').toString();

const newRoute = {
  path: '/list',
  name: 'list'
  // component: ListComponent
};

// 定义一个 babel 插件，拦截并修改 routes 的数组表达式
let visitor = {
  ArrayExpression(path) {
    const elements = path.node.elements;
    console.warn(`routes number:  ${elements.length}`);
    // 新增一个构建出来的 route 对象
    elements.push(t.objectExpression([
      t.objectProperty(t.identifier('path'), t.stringLiteral(newRoute.path)),
      t.objectProperty(t.identifier('name'), t.stringLiteral(newRoute.name)),
      t.objectProperty(t.identifier('component'), t.identifier('ListComponent'))
    ]));
  }
}

// 通过 plugin 转换源代码 parse 出来的AST 抽象语法树，并且返回结果
let result= babel.transform(content, {
   plugins: [
     { visitor }
   ]
 });

console.warn(`res: ${result.code}`);
// 把新代码写入新文件.
fs.writeFileSync('newRoute.js', result.code);
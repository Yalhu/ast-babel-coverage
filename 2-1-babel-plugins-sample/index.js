/**
 * [如何通过babel去操作ast, 并生成对应的代码。](https://learnku.com/articles/69056)
 *  PS: 把 `const code = ` 和 `const { ast } = ` 换成了var，阻止了文件中报错。
 */

/* # 1 修改对象名，比如 Taro.xxx 修改为 wx.xxx */
const babel = require('@babel/core')
let traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const types = require('@babel/types');

var code = 'wx.login();let env = wx.env'
var { ast } = babel.transformSync(code, { ast: true })
traverse(ast, {
  BlockStatement(path) {
    path.scope.rename('wx', 'ft')
  },
  Identifier(path) {
    if (path.isReferenced() && path.node.name === 'wx') {
      path.replaceWith(types.identifier('ft'))
    }
  },
})

console.log(generate(ast, {}).code)
/* # 2 在代码中插入对应的节点，比如在某个对象中插入一个属性# */
// const babel = require('@babel/core');
// let traverse = require('@babel/traverse').default
// const generate = require('@babel/generator').default
// const types = require('@babel/types');

var code = 'let a = { b: 2, c: 1 }'
var { ast } = babel.transformSync(code, { ast: true })
traverse(ast, {
  ObjectExpression(path) {
    path.node.properties.push(
      types.objectProperty(
        types.identifier("d"),
        types.identifier("2")
      )
    )
  }
})
console.log(generate(ast, {}).code)
/* # 3 在代码中插入对应的节点，比如在某个对象中插入一个属性# */
// const babel = require('@babel/core');
// let traverse = require('@babel/traverse').default
// const generate = require('@babel/generator').default
// const types = require('@babel/types');

var code = 'let a = { b: 2, c: 1 }'
var { ast } = babel.transformSync(code, { ast: true })
traverse(ast, {
  ObjectExpression(path) {
    path.node.properties.push(
      types.objectProperty(
        types.identifier("d"),
        types.identifier("2")
      )
    )
  }
})
console.log(generate(ast, {}).code)
/* # 4 找到代码中的依赖文件 */
// const babel = require('@babel/core');
// let traverse = require('@babel/traverse').default

var code = 'const demo = require("./demo"); import test from "test.js" '
var { ast } = babel.transformSync(code, { ast: true })
traverse(ast, {
  ImportDeclaration(path) {
    console.log(path.node.source.extra.rawValue)
  },
  CallExpression(path) {
    if (path.node.callee.name === 'require' && path.node.arguments) {
      console.log(path.node.arguments[0].value)
    }
  }
})

/* # 5 在表达式前后插入一个方法# */
// const babel = require('@babel/core');
// let traverse = require('@babel/traverse').default
// const types = require('@babel/types');
// const generate = require('@babel/generator').default;

var code = 'var a = 1'
var { ast } = babel.transformSync(code, { ast: true })

traverse(ast, {
  enter(path) {
    if (types.isExpressionStatement(path.node)) {
      try {
        if (path.node.expression.callee.name === 'demo') {
          return
        }
      } catch (error) {
      }
    }
    const item = types.expressionStatement(
      types.callExpression(
        types.identifier('demo'),
        [
          types.identifier(`data`),
        ]
      )
    )
    if (types.isStatement(path.node)) {
      path.insertBefore(item)
      path.insertAfter(item)
    }
  }
})
console.log(generate(ast, {}).code)

const t = require('@babel/types');
const {parse} = require('@babel/parser');
const {default: traverse} = require('@babel/traverse');
const {default: generate} = require('@babel/generator');

const codes = "log('Hello, world!');";

const ast = parse(codes, {
  sourceType: "module"
});

const visitor = {
  Identifier(path) {
    const {node} = path;
    if(node && node.name === 'log') {
      path.replaceWith(createMemberExpression());
      path.stop();
    }
  }
}

traverse(ast, visitor);

const {code} = generate(ast, { /* options */ }, codes);

console.log(code);
// console.log('Hello, world!');

function createMemberExpression() {
  return t.memberExpression(
    t.identifier('console'),
    t.identifier('log')
  );
}
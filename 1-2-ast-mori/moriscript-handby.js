// const babel = require('@babel/core');
const t = require('@babel/types');
const generate = require('@babel/generator').default;

// module.exports = function(babel) {
module.exports = function({ types: t, template }) {
    return {
        vistor: {
            ArrayExpression(path) {
                
            }
        }
    }
}
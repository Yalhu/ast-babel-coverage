const log = console.log.bind(null, '[babel-plugin]%c', 'color: #0f0')

const code_cov = `
    const coverages = {};

`
function genCov() {

}

const visitor = {
    Program(path) {
        // log('Program:: ', path)
        log('Program:: ', path.hub)
        // path.get('body').unshiftContainer('body', t.expressionStatement(t.stringLiteral('before'))); 

    },
    FunctionDeclaration: function(path) {
        // log('FunctionDeclaration:: ', path)
    },
    Function(path) {
        const as0 = t.expressionStatement(t.stringLiteral('before'));
        const ast1 = template.ast(`this.coverageVar.f[''] ++;`);
        path.get('body').unshiftContainer('body', ast1); 
        // log('Function:: ', path)
    },
    exit() {
        log('exit:: ', path)

    }
}

module.exports = function ({ types: t, template }) {
    return {
        visitor
    }
}
const log = console.log.bind(null, '[vistor]%c', 'color: #0f0')


// function coverFunction(path) {
//     this.insertFunctionCounter(path);
// }
function insertStatementCounter(path) {
    /* istanbul ignore if: paranoid check */
    // if (!(path.node && path.node.loc)) {
    //     return;
    // }
    const index = this.cov.newStatement(path.node.loc);
    const increment = this.increase('s', index, null);
    this.insertCounter(path, increment);
}

function coverStatement(path) {
    insertStatementCounter(path);
}
const vistor = function (a, b, c) {
    log(a, b, c)
}

function programVisitor(types, sourceFilePath = 'unknown.js', opts = {coverageVariable: '__coverage__', inputSourceMap: undefined }) {
    const T = types;
    const visitState = new VisitState(types, sourceFilePath, opts.inputSourceMap);
    return {
        enter(path) {
            path.traverse(codeVisitor, visitState);
        },
        exit(path) {
            visitState.cov.freeze();
            const coverageData = visitState.cov.toJSON();
            coverageData[MAGIC_KEY] = MAGIC_VALUE;
            const hash = createHash(SHA).update(JSON.stringify(coverageData)).digest('hex');
            const coverageNode = T.valueToNode(coverageData);
            delete coverageData[MAGIC_KEY];
            const cv = coverageTemplate({
                GLOBAL_COVERAGE_VAR: T.stringLiteral(opts.coverageVariable),
                COVERAGE_VAR: T.identifier(visitState.varName),
                PATH: T.stringLiteral(sourceFilePath),
                INITIAL: coverageNode,
                HASH: T.stringLiteral(hash)
            });
            cv._blockHoist = 3;
            path.node.body.unshift(cv);
            return {
                fileCoverage: coverageData,
                sourceMappingURL: visitState.sourceMappingURL
            };
        }
    };
}

module.exports = programVisitor
//.my-plugin.js
module.exports = function (babel) {
    return {
        visitor: {
            VariableDeclaration(path, state) {
            path.node.declarations.forEach(each => {
                path.scope.rename(
                each.id.name,
                path.scope.generateUidIdentifier("uid").name
                );
            });

            }
        },
    }
}

/*
//babel.config.json
{

    "plugins": [

        ["./my-plugin"],

    ["@babel/plugin-proposal-pipeline-operator", {

        "proposal": "hack",

        "topicToken": "^^"

    }]

    ]

}
*/
/*
// ===== 输出 ======
const _uid = x => x ** 2;

const _uid2 = a => a + 2;

const _uid3 = _uid2(_uid(5));

*/
const fs = require('fs');
const path = require('path');

// check filePath
function checkFileExists(fullPath) {
  return fs.existsSync(fullPath);
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure that imported static images exist',
      category: 'Possible Errors',
      recommended: true
    },
    messages: {
      imageNotFound: 'Static image "{{importPath}}" does not exist'
    },
    schema: [
      {
        type: 'object',
        properties: {},
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const options = context.options[0] || {};
    const alias = options.alias || {'@': 'src'}
    const extensions = options.extensions || ['.png', '.jpg', '.jpeg', '.gif', '.svg']

    return {
      ImportDeclaration(node) {
        let importPath = node.source.value;

        // check extensions
        const ext = path.extname(importPath).toLowerCase();
        if (!extensions.includes(ext)) return;

        const aliasKeys = Object.keys(alias);
        // if pass check prefix
        let canPass = false;
        for(let i = 0; i < aliasKeys.length; i++) {
          if(importPath.startsWith(aliasKeys[i])) {
            canPass = true;
            break;
          }
        }
        // only check files startsWith . or alias
        if (!importPath.startsWith('.') && !canPass) return;

        if(importPath.startsWith('.')) {
          const fileDir = path.dirname(context.getFilename())

          importPath = path.resolve(fileDir, importPath)
        }else {
          // handle alias
          aliasKeys.forEach(x => {
            // find target alias
            if(importPath.includes(x)) {
              // {'@': 'src'} -> 'src'
              const targetValue = alias[x];

              importPath = path.resolve(process.cwd(), targetValue, importPath.slice(x.length + 1));
            }
          })
        }


        if (!checkFileExists(importPath)) {
          context.report({
            node,
            messageId: 'imageNotFound', // use messageId output Error
            data: {
              importPath
            }
          });
        }
      }
    };
  }
};

const fs = require('fs')
const css = require('css')

function parseSelectors(selectors) {
  let exp = /[\.#]([a-zA-Z0-9_-]+)/g
  let names = []
  for (let i = 0; i < selectors.length; i++) {
    selectors[i] = selectors[i].replace(exp, (string) => {
      let newName = string.replace(/-/g, '_')
      names.push(newName.substr(1))
      return newName
    })
  }
  return {
    selectors,
    names,
  }
}

function parseRules(rules) {
  let vars = []
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].type === 'rule') {
      let { names, selectors } = parseSelectors(rules[i].selectors)
      rules[i].selectors = selectors
      vars = vars.concat(names)
    }
    if (rules[i].type === 'media' && rules[i].rules) {
      vars = vars.concat(parseRules(rules[i].rules))
    }
  }
  return Array.from(new Set(vars))
}

module.exports = function (source) {
  let ast = css.parse(source)
  let names = parseRules(ast.stylesheet.rules)
  let types = names.map((item) => `export const ${item}: string;`).join('\n')
  fs.writeFileSync(this.resourcePath + '.d.ts', types, 'utf-8')
  return css.stringify(ast)
}

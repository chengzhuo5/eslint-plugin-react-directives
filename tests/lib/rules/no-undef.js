const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-undef');

new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6
  }
}).run('no-undef', rule, {
  valid: [
    {
      code: `
        const list = [1, 2, 3]
        const foo = <li v-for={(item, index) in list} key={item.id}>{item}</li>
      `
    },
    {
      code: `
        const foo = (
          <li v-for={(item, index) in [1, 2, 3]} key={item.id}>
            <span>{item}</span>
          </li>
        )
      `
    },
    {
      code: `
        const foo = (
          <li x-for={(item, index) in [1, 2, 3]} key={item.id}>{item}</li>
        )
      `,
      settings: {
        '@minar-kotonoha/eslint-plugin-react-directives': {
          prefix: 'x'
        }
      }
    },
  ],
  invalid: [
    {
      code: `
        const foo = (
          <li foo={(item) in [1, 2, 3]} key={item.id}>{item}</li>
        )
      `,
      errors: [
        { message: /'item' is not defined/ },
        { message: /'item' is not defined/ },
        { message: /'item' is not defined/ }
      ]
    },
    {
      code: `
        const foo = (
          <li v-for={item in [1, 2, 3]} key={item.id}>{item}</li>
        )
        item
      `,
      errors: [
        { message: /'item' is not defined/ }
      ]
    },
    {
      code: `
        const foo = (
          <div>
            <li v-for={item in [1, 2, 3]} key={item.id}>{item}</li>
            {item}
          </div>
        )
      `,
      errors: [
        { message: /'item' is not defined/ }
      ]
    },
  ]
});

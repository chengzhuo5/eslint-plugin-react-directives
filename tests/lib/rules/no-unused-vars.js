const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-unused-vars');

new RuleTester({
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6
  }
}).run('no-unused-vars', rule, {
  valid: [
    {
      code: `
        export default () => {
          const [data, setData] = useState(0);
          return <input v-model-hook={data.foo}/>
        }
      `
    },
    {
      code: `
        export default () => {
          const [data, setData] = React.useState(0);
          return <input v-model-hook={data}/>
        }
      `
    },
    {
      code: `
        export default () => {
          const [data, setData] = React['useState'](0);
          return <input v-model-hook={data}/>
        }
      `
    },
    {
      code: `
        export default () => {
          const [data, setData] = useState(0);
          return <input v-model-hook={data}/>
        }
      `
    },
    {
      code: `
        export default () => {
          const {
            0: data,
            1: setState
          } = useState(0);
          return <input v-model-hook={data}/>
        }
      `
    },
    {
      code: `
        export default () => {
          const [data, setData] = useState(0);
          return <input x-model-hook={data}/>
        }
      `,
      settings: {
        '@minar-kotonoha/eslint-plugin-react-directives': {
          prefix: 'x'
        }
      }
    },
    {
      code: `
        export default () => {
          const [data, setData] = Preact.useState(0);
          return <input v-model-hook={data}/>
        }
      `,
      settings: {
        '@minar-kotonoha/eslint-plugin-react-directives': {
          pragmaType: 'Preact'
        }
      }
    },
    {
      code: `
        export default () => {
          const data = useState(0);
          return <input v-model-hook={data}/>
        }
      `
    }
  ],
  invalid: [
    {
      code: `
        const [data, setData] = useState(0);
      `,
      errors: [
        { message: /assigned a value but never used/ },
        { message: /assigned a value but never used/ }
      ]
    },
    {
      code: `
        export default () => {
          const [data, setData] = Foo.useState(0);
          return <input v-model-hook={data}/>
        }
      `,
      errors: [
        { message: /assigned a value but never used/ }
      ]
    },
    {
      code: `
        export default () => {
          const [data, setData] = useState(0);
          return <input v-abc={data}/>
        }
      `,
      errors: [
        { message: /assigned a value but never used/ }
      ]
    }
  ]
});

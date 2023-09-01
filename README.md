# Aesthetic UI (TypeScript)

É um pacote de com componentes de layout para facilitar a construção de interfaces gráficas.

## Configuração
> Adicione está linha no arquivo tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@adaneinstein/**/*" \\-> Esta aqui!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```


## Dependences
* @emotion/react: "^11.11.1",
* @emotion/styled: "^11.11.0",
* @hookform/resolvers: "^3.3.1",
* @mui/icons-material: "^5.14.7",
* @mui/material: "^5.14.7",
* @mui/x-data-grid: "^6.12.0",
* notistack: "^3.0.1",
* react-hook-form: "^7.45.4",
* tailwind-variants: "^0.1.13",
* zod: "^3.22.2"

# Componentes Disponíveis:
```js
export {
    Card,
    Nav,
    Input,
    Navbar,
    Select,
    FilterCard, // => Para utilizá-lo é necessário o contexto "FilterFieldsProvider" e o Hook "useFilter"
    BasicModal,
    DataGridActions,
    SelectAutoComplete,
} from '@adaneinstein/aesthetic-ui'
```

# Contextos:
```js
export { FilterFieldsProvider } from '@adaneinstein/aesthetic-ui'
```

# Hooks
```js
export { useFilter } from '@adaneinstein/aesthetic-ui'
```

# Util functions
```js
//Tranforma um objeto aninhado (objeto dentro de outro objeto) num único objeto
export { flatObject } from '@adaneinstein/aesthetic-ui'

//Funções que auxiliam caso o timezone seja Sao_Paulo/Brasil
export { isValidDate, adjustedDate } from '@adaneinstein/aesthetic-ui'

//Formata uma string de um padrão snackCase para Pascal Case
export { snakeCasetoPascal_Case } from '@adaneinstein/aesthetic-ui'
```

# Exemplos...

```js
import { Card, Navbar } from '@adaneinstein/aesthetic-ui'

function App() {
  return (
    <div
      className="h-screen"
      style={{
        display: 'grid',
        gridTemplateRows: '60px 1fr',
      }}
    >
      <Navbar.Root className="gap-3">
        <Navbar.Content>
        </Navbar.Content>
        <Navbar.Right>
          <Navbar.Container title="Aplicação" subtitle="&copy; Adan Einstein - 2023" />
        </Navbar.Right>
      </Navbar.Root>
      <div className="flex justify-center items-center">
        <Card.Root className="lg:w-2/5 md:w-4/6 w-5/6 pb-5">
          <Card.Header className="flex justify-center items-center">
            <h1 className="font-light text-2xl text-zinc-800">Login</h1>
          </Card.Header>
          <Card.Body className="flex flex-col justify-center items-center">
            <h1 className="mb-5 text-2xl font-light">Olá mundo</h1>
            <a
              className="p-3 rounded-lg hover:bg-blue-300 hover:border-blue-500 border-2"
              href={'/home'}
            >
              Navegar
            </a>
          </Card.Body>
        </Card.Root>
      </div>
    </div>
  )
}

export default App
```
# Aesthetic UI (TypeScript)

É um pacote de com componentes de layout para facilitar a construção de interfaces gráficas.

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
export { default as BasicModal } from './BasicModal'
export { DataGridActions } from './DataGrid'
export { FilterCard } from './FilterCard'
export {default as Input} from './Forms/Input'
export {default as Select} from './Forms/Select'
export {default as SelectAutoComplete} from './Forms/SelectAutoComplete'
export {Card} from './Layout/Card'
export {default as Nav} from './Layout/Nav'
export {Navbar} from './Layout/Navbar'
export { FilterFieldsProvider } from './FilterCard/contexts/FilterFieldsContext'
```
# Hooks
```js
export { default as useFilter } from './FilterCard/contexts/hooks/useFilter'
```

# Util functions
```js
//Tranforma um objeto aninhado (objeto dentro de outro objeto) num único objeto
export {default as flatObject} from './flatObject'

//Funções que auxiliam caso o timezone seja Sao_Paulo/Brasil
export {isValidDate, adjustedDate} from './converters/date'

//Formata uma string de um padrão snackCase para Pascal Case
export {snackCasetoPascal_Case} from './converters/string'
```
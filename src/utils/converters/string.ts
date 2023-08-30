export const snackCasetoPascal_Case = (value: string) => {
  return value.split('_').map((val) => {
    return val.split('').map((v, i) => i == 0 ? v.toUpperCase() : v).join('')
  }).join(' ')
}
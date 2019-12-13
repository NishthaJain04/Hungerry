export function getFirstError(errors) {
  if (errors) {
    return errors[Object.keys(errors)[0]][0]
  }
  return ''
}
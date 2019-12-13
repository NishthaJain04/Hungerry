export function isNumber(input) {
  const numberRegex = /^\d+$/
  return numberRegex.test(input)
}
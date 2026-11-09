export function splitWords(text) {
  return text
    .split(/(\s+)/)
    .filter(Boolean)
    .map(part => ({ text: part, isSpace: /^\s+$/.test(part) }))
}

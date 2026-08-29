export function opaquifyColor(color) {
  return color.replace(/[\d.]+\)$/, '1)')
}

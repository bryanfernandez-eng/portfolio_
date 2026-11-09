export function onFontsReady(callback) {
  let isCancelled = false
  document.fonts.ready.then(() => {
    if (!isCancelled) callback()
  })
  return () => {
    isCancelled = true
  }
}

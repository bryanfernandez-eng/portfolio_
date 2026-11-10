const clamp01 = value => Math.min(1, Math.max(0, value))
const NODE_RADIUS = 8

function updateRail(rows, isReduced) {
  const line = window.innerHeight * 0.55
  const nodeY = row => row.querySelector('.node').offsetTop + NODE_RADIUS
  let active = -1
  rows.forEach((row, i) => {
    if (isReduced || line >= row.getBoundingClientRect().top + nodeY(row)) active = i
  })
  rows.forEach((row, i) => {
    const rect = row.getBoundingClientRect()
    const nt = nodeY(row)
    const start = i === 0 ? nt : 0
    const end = i === rows.length - 1 ? nt : rect.height
    const fill = isReduced ? 1 : clamp01((line - rect.top - start) / (end - start))
    row.style.setProperty('--fill', fill.toFixed(3))
    row.classList.toggle('on', i <= active)
    row.classList.toggle('active', !isReduced && i === active)
  })
}

function lightWords(rows, isReduced) {
  rows.forEach(row => {
    const detail = row.querySelector('.xp-detail')
    const words = detail.querySelectorAll('.wd')
    const progress = isReduced ? 1 : clamp01((window.innerHeight * 0.9 - detail.getBoundingClientRect().top) / (window.innerHeight * 0.4))
    const count = Math.round(progress * words.length)
    words.forEach((word, k) => word.classList.toggle('on', k < count))
    row.classList.toggle('lit', progress >= 0.95)
  })
}

export function updateExperience(list, isReduced) {
  const rows = [...list.children]
  lightWords(rows, isReduced)
  updateRail(rows, isReduced)
}

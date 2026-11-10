const INSET = 28

export function buildBridgePath(width, height, isMirrored) {
  const radius = Math.min(56, height * 0.3)
  const sign = isMirrored ? -1 : 1
  const x0 = isMirrored ? width - INSET : INSET
  const x1 = isMirrored ? INSET : width - INSET
  const mid = height * 0.5
  return `M${x0} 0V${height * 0.2}Q${x0} ${mid} ${x0 + sign * radius} ${mid}H${x1 - sign * radius}Q${x1} ${mid} ${x1} ${height * 0.8}V${height}`
}

export function bridgeProgress(host) {
  const rect = host.getBoundingClientRect()
  return Math.min(1, Math.max(0, (window.innerHeight * 0.9 - rect.top) / (rect.height * 0.9)))
}

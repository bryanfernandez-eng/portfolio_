import { useEffect } from 'react'
import { COLORS } from '../constants/colors'

const CELL = 48
const RADIUS = 170
const MAX_PUSH = 34
const STIFFNESS = 0.14
const DAMPING = 0.76
const GRID_LINE = 'rgba(0,0,0,0.07)'
const SETTLE_EPS = 0.05

// Interactive blueprint grid: vertices near the pointer are shoved radially
// outward and spring back, so the mesh ruptures open and reseals as you move.
export function useRuptureGrid(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -9999, y: -9999, isActive: false }
    let cols = 0
    let rows = 0
    let verts = []
    let raf = 0
    let isVisible = true

    const build = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / CELL) + 2
      rows = Math.ceil(h / CELL) + 2
      verts = []
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * CELL
          const y = r * CELL
          verts.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 })
        }
      }
      draw()
    }

    const strokeMesh = () => {
      for (let r = 0; r < rows; r++) {
        ctx.beginPath()
        for (let c = 0; c < cols; c++) {
          const v = verts[r * cols + c]
          if (c === 0) ctx.moveTo(v.x, v.y)
          else ctx.lineTo(v.x, v.y)
        }
        ctx.stroke()
      }
      for (let c = 0; c < cols; c++) {
        ctx.beginPath()
        for (let r = 0; r < rows; r++) {
          const v = verts[r * cols + c]
          if (r === 0) ctx.moveTo(v.x, v.y)
          else ctx.lineTo(v.x, v.y)
        }
        ctx.stroke()
      }
    }

    const draw = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      ctx.clearRect(0, 0, w, h)
      let maxMotion = 0
      for (const v of verts) {
        let tx = v.ox
        let ty = v.oy
        const dx = v.ox - pointer.x
        const dy = v.oy - pointer.y
        const dist = Math.hypot(dx, dy)
        if (pointer.isActive && dist < RADIUS) {
          const falloff = (1 - dist / RADIUS) ** 2
          const inv = dist || 1
          tx += (dx / inv) * MAX_PUSH * falloff
          ty += (dy / inv) * MAX_PUSH * falloff
        }
        v.vx = (v.vx + (tx - v.x) * STIFFNESS) * DAMPING
        v.vy = (v.vy + (ty - v.y) * STIFFNESS) * DAMPING
        v.x += v.vx
        v.y += v.vy
        const motion = Math.abs(v.vx) + Math.abs(v.vy) + Math.abs(v.x - v.ox) + Math.abs(v.y - v.oy)
        if (motion > maxMotion) maxMotion = motion
      }
      ctx.lineWidth = 1
      ctx.strokeStyle = GRID_LINE
      strokeMesh()
      if (!pointer.isActive) return maxMotion
      ctx.save()
      ctx.beginPath()
      ctx.arc(pointer.x, pointer.y, RADIUS, 0, Math.PI * 2)
      ctx.clip()
      const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, RADIUS)
      glow.addColorStop(0, `${COLORS.dark}1f`)
      glow.addColorStop(1, `${COLORS.dark}00`)
      ctx.fillStyle = glow
      ctx.fillRect(pointer.x - RADIUS, pointer.y - RADIUS, RADIUS * 2, RADIUS * 2)
      ctx.lineWidth = 1.4
      ctx.strokeStyle = `${COLORS.dark}99`
      strokeMesh()
      ctx.restore()
      return maxMotion
    }

    // Runs only while the pointer is engaged or the mesh is still springing
    // back; parks itself once everything is at rest so idle frames cost nothing.
    const loop = () => {
      const motion = draw()
      if (!pointer.isActive && motion < SETTLE_EPS) {
        raf = 0
        return
      }
      raf = requestAnimationFrame(loop)
    }

    const kick = () => {
      if (raf || isReduced || !isVisible) return
      raf = requestAnimationFrame(loop)
    }

    const handleMove = (e) => {
      const rect = parent.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.isActive = true
      kick()
    }
    const handleLeave = () => {
      pointer.isActive = false
      kick()
    }

    build()
    const observer = new ResizeObserver(build)
    observer.observe(parent)

    // Stop animating entirely when the grid scrolls out of view.
    const visObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) {
        kick()
      } else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    visObserver.observe(parent)

    if (!isReduced) {
      parent.addEventListener('pointermove', handleMove)
      parent.addEventListener('pointerleave', handleLeave)
    }
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      visObserver.disconnect()
      parent.removeEventListener('pointermove', handleMove)
      parent.removeEventListener('pointerleave', handleLeave)
    }
  }, [canvasRef])
}

import { HW, RIM_X, RIM_D, RIM_Z } from './perspective'

export const BR = 0.6
export const LANE = 2.8
const GRAVITY = 40
const SHOT_TIME = 0.85

const SOLIDS = [
  { k: 'plantl', x: -9.2, d: 8.8, r: 0.8, h: 3.6 }, { k: 'lamp', x: -6, d: 9.5, r: 0.35, h: 5.9 },
  { k: 'plantr', x: 6.1, d: 8.6, r: 0.8, h: 3.6 }, { k: 'chair', x: 0, d: 5.1, r: 1.4, h: 3.4 },
  { k: 'bag', x: -6.8, d: 1.5, r: 0.8, h: 1.5 }, { k: 'skate', x: 5.6, d: 2.0, r: 1.0, h: 0.5 },
]
const RECTS = [
  { k: 'desk', x0: -4.7, x1: 4.7, d0: 6.5, d1: 10.4, h: 3.3 }, { k: 'couch', x0: -11.4, x1: -9.0, d0: 1.2, d1: 6.4, h: 2.0 },
]

export const createBall = () => ({ x: 0, d: 3.4, z: 3, vx: 0, vd: 0, vz: 0, a: 0, flying: false, fly: 0, rimDone: false })

function collideRects(ball, bump) {
  RECTS.forEach(r => {
    if (ball.flying || ball.z - BR >= r.h || ball.x <= r.x0 - BR || ball.x >= r.x1 + BR || ball.d <= r.d0 - BR || ball.d >= r.d1 + BR) return
    const pen = [ball.x - (r.x0 - BR), r.x1 + BR - ball.x, ball.d - (r.d0 - BR), r.d1 + BR - ball.d]
    const i = pen.indexOf(Math.min(...pen))
    if (i === 0) { ball.x = r.x0 - BR; ball.vx = -Math.abs(ball.vx) * 0.6 }
    else if (i === 1) { ball.x = r.x1 + BR; ball.vx = Math.abs(ball.vx) * 0.6 }
    else if (i === 2) { ball.d = r.d0 - BR; ball.vd = -Math.abs(ball.vd) * 0.6 }
    else { ball.d = r.d1 + BR; ball.vd = Math.abs(ball.vd) * 0.6 }
    bump(r.k)
  })
}

function collideHoop(ball, bump) {
  const rim = Math.hypot(ball.x - RIM_X, ball.d - RIM_D)
  if (!ball.rimDone && ball.vz < 0 && ball.z < RIM_Z + 0.2) {
    ball.rimDone = true
    if (rim < 0.6) { ball.vx *= 0.1; ball.vd *= 0.1; bump('hoop') }
    else if (rim < 1.1) { ball.vz = Math.abs(ball.vz) * 0.5; ball.vx *= -0.4; bump('hoop') }
  }
  if (ball.x > HW - 0.5 && ball.z > 5.3 && ball.z < 7.7 && ball.d > 3.9 && ball.d < 6.5) {
    ball.x = HW - 0.5
    ball.vx = -Math.abs(ball.vx) * 0.5
    bump('hoop')
  }
}

function collideSolids(ball, [tx, td], bump) {
  SOLIDS.forEach(s => {
    if (ball.flying || ball.z - BR > s.h) return
    const dx = ball.x - s.x
    const dd = ball.d - s.d
    const dist = Math.hypot(dx, dd)
    const min = s.r + BR
    if (dist >= min || dist === 0) return
    const nx = dx / dist
    const nd = dd / dist
    const vn = ball.vx * nx + ball.vd * nd
    ball.x = s.x + nx * min
    ball.d = s.d + nd * min
    if (vn < 0) { ball.vx -= 1.6 * vn * nx; ball.vd -= 1.6 * vn * nd }
    const side = (tx - ball.x) * -nd + (td - ball.d) * nx
    const go = Math.abs(side) > 0.5 ? Math.sign(side) : (nx > 0 ? 1 : -1)
    ball.vx += -nd * go * 0.6
    ball.vd += nx * go * 0.6
    bump(s.k)
  })
}

function applyBounds(ball, minD) {
  if (ball.z < BR) { ball.z = BR; ball.vz = Math.max(-ball.vz * 0.8, 12); if (ball.fly <= 0) ball.flying = false }
  if (Math.abs(ball.x) > HW - BR) { ball.x = Math.sign(ball.x) * (HW - BR); ball.vx *= -0.6 }
  if (ball.d < minD) { ball.d = minD; ball.vd *= -0.6 }
  if (ball.d > 10.8) { ball.d = 10.8; ball.vd *= -0.6 }
}

function collideShelf(ball, bump) {
  if (ball.x > 7.3 - BR && ball.x < 10.9 + BR && ball.z < 6.5 && ball.d > 10 - BR) {
    ball.d = 10 - BR
    ball.vd = -Math.abs(ball.vd) * 0.6
    bump('shelf')
  }
}

export function stepBall(ball, dt, [tx, goalD], minD, bump) {
  const td = ball.x * tx < 0 && goalD > 3 ? Math.max(minD, LANE) : goalD
  if (ball.flying) ball.fly -= dt
  else {
    ball.vx += ((tx - ball.x) * 13 - ball.vx * 6) * dt
    ball.vd += ((td - ball.d) * 13 - ball.vd * 6) * dt
  }
  ball.vz -= GRAVITY * dt
  ball.x += ball.vx * dt
  ball.d += ball.vd * dt
  ball.z += ball.vz * dt
  applyBounds(ball, minD)
  collideRects(ball, bump)
  if (ball.flying) collideHoop(ball, bump)
  collideShelf(ball, bump)
  collideSolids(ball, [tx, td], bump)
  ball.a += (ball.vx / BR) * 40 * dt
}

export function shootBall(ball) {
  if (ball.flying) return
  ball.vx = (RIM_X + (Math.random() - 0.5) * 0.9 - ball.x) / SHOT_TIME
  ball.vd = (RIM_D + (Math.random() - 0.5) * 0.9 - ball.d) / SHOT_TIME
  ball.vz = (RIM_Z - ball.z) / SHOT_TIME + 0.5 * GRAVITY * SHOT_TIME
  ball.flying = true
  ball.fly = SHOT_TIME
  ball.rimDone = false
}

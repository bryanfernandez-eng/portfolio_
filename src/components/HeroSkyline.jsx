import { useHorizon } from '../hooks/useHorizon'
import { classNames } from '../utils/classNames'
import { HEIGHT, HORIZON, RIPPLES, SKYLINE, WIDTH } from '../utils/skyline/skyline'
import './HeroSkyline.css'

const MASK_ID = 'skyline-ripple'

function Pieces() {
  return SKYLINE.map(({ key, kind, d }) => <path key={key} className={kind} d={d} />)
}

function HeroSkyline({ heroRef, titleRef, isActive }) {
  useHorizon(heroRef, titleRef)

  return (
    <svg className={classNames('skyline', !isActive && 'paused')} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true">
      <defs>
        <mask id={MASK_ID} maskUnits="userSpaceOnUse" x="0" y={HORIZON} width={WIDTH} height={HEIGHT - HORIZON}>
          {RIPPLES.map(({ key, d, opacity, delay }) => (
            <path key={key} className="rip" d={d} fill="#fff" fillOpacity={opacity} style={{ animationDelay: delay }} />
          ))}
        </mask>
      </defs>
      <g>
        <Pieces />
      </g>
      <g className="reflection" mask={`url(#${MASK_ID})`}>
        <g transform={`translate(0 ${2 * HORIZON}) scale(1 -1)`}>
          <Pieces />
        </g>
      </g>
      <path className="horizon" d={`M0 ${HORIZON}H${WIDTH}`} />
    </svg>
  )
}

export default HeroSkyline

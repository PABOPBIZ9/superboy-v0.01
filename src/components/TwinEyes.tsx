import { useId } from 'react'
import type { EyeLook } from '../data/eyes'
import type { Mood } from '../store'

type Props = {
  look: EyeLook
  mood: Mood
  gaze?: { x: number; y: number }
  winkLeft?: boolean
  size?: number
}

function PixelGrid({ color, accent }: { color: string; accent: string }) {
  const cells = [
    0, 1, 1, 1, 1, 0,
    1, 1, 0, 0, 1, 1,
    1, 0, 1, 1, 0, 1,
    1, 0, 1, 1, 0, 1,
    1, 1, 0, 0, 1, 1,
    0, 1, 1, 1, 1, 0,
  ]
  return (
    <g>
      {cells.map((on, i) => {
        const x = (i % 6) * 3.1 - 9.3
        const y = Math.floor(i / 6) * 3.1 - 9.3
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="2.8"
            height="2.8"
            rx="0.3"
            fill={on ? color : accent}
            opacity={on ? 1 : 0.18}
          />
        )
      })}
    </g>
  )
}

function OneEye({
  look,
  mood,
  gaze,
  closed,
  maskId,
}: {
  look: EyeLook
  mood: Mood
  gaze: { x: number; y: number }
  closed?: boolean
  maskId: string
}) {
  const gx = closed ? 0 : gaze.x * 3.2
  const gy = closed ? 0 : gaze.y * 3.2
  const sleepy = mood === 'warm' || look.shape === 'crescent'
  const dizzy = mood === 'dizzy' || look.shape === 'spiral'
  const battery = mood === 'battery'

  return (
    <g>
      <ellipse
        cx="0"
        cy="0"
        rx="13"
        ry={closed ? 1.4 : sleepy ? 9 : 12}
        fill={look.sclera}
        className={closed ? undefined : 'eye-blink'}
      />
      {!closed && (
        <g className={closed ? undefined : 'eye-blink'}>
          <defs>
            <clipPath id={maskId}>
              <ellipse cx="0" cy="0" rx="13" ry={sleepy ? 9 : 12} />
            </clipPath>
          </defs>
          <g clipPath={`url(#${maskId})`}>
            {look.shape === 'pixel' ? (
              <g transform={`translate(${gx}, ${gy})`}>
                <PixelGrid color={look.iris} accent={look.glow} />
              </g>
            ) : look.shape === 'galaxy' ? (
              <g transform={`translate(${gx}, ${gy})`}>
                <circle r="9.5" fill={look.iris} />
                <circle r="6" fill={look.pupil} opacity="0.85" />
                <circle r="2.2" fill={look.accent} />
                <circle cx="4" cy="-3" r="0.7" fill="#fff" />
                <circle cx="-5" cy="2" r="0.5" fill={look.accent} />
                <circle cx="2" cy="5" r="0.4" fill="#fff" opacity="0.7" />
              </g>
            ) : look.shape === 'glitch' ? (
              <g transform={`translate(${gx}, ${gy})`}>
                <rect x="-10" y="-8" width="20" height="3" fill={look.iris} opacity="0.9" />
                <rect x="-8" y="-3" width="16" height="2" fill={look.accent} />
                <rect x="-11" y="1" width="18" height="3" fill={look.iris} />
                <rect x="-6" y="6" width="14" height="2" fill={look.glow} />
                <circle r="3.2" fill={look.pupil} />
              </g>
            ) : look.shape === 'star' || look.shape === 'foil' ? (
              <g transform={`translate(${gx}, ${gy})`}>
                <circle r="8.6" fill={look.iris} />
                <path
                  d="M0,-7 L1.8,-2.2 L7,-2 L2.8,1.2 L4.2,6.2 L0,3.4 L-4.2,6.2 L-2.8,1.2 L-7,-2 L-1.8,-2.2 Z"
                  fill={look.accent}
                />
                <circle r="1.6" fill={look.pupil} />
              </g>
            ) : look.shape === 'heart' ? (
              <g transform={`translate(${gx}, ${gy})`}>
                <path
                  d="M0,7 C0,7 -9,1 -9,-3 C-9,-6.5 -6.2,-8 -4,-6.2 C-2.4,-7.8 0,-6.6 0,-4.2 C0,-6.6 2.4,-7.8 4,-6.2 C6.2,-8 9,-6.5 9,-3 C9,1 0,7 0,7 Z"
                  fill={look.iris}
                />
                <circle cx="-2" cy="-2" r="1.2" fill={look.accent} opacity="0.8" />
              </g>
            ) : look.shape === 'slit' ? (
              <g transform={`translate(${gx}, ${gy})`}>
                <circle r="8.4" fill={look.iris} />
                <ellipse rx="1.6" ry="7.2" fill={look.pupil} />
              </g>
            ) : look.shape === 'laser' || look.shape === 'visor' ? (
              <g>
                <rect x="-12" y="-3.2" width="24" height="6.4" rx="3" fill={look.iris} />
                <rect x="-8" y="-1.4" width="10" height="2.6" rx="1" fill={look.accent} opacity="0.7" />
              </g>
            ) : dizzy ? (
              <g transform={`translate(${gx}, ${gy})`}>
                <circle r="8.2" fill={look.iris} />
                <path
                  d="M0,0 Q3,-4 0,-6 Q-4,-3 0,0 Q4,4 0,7"
                  fill="none"
                  stroke={look.accent}
                  strokeWidth="1.4"
                />
                <circle r="1.4" fill={look.pupil} />
              </g>
            ) : battery ? (
              <g>
                <rect x="-7" y="-4" width="13" height="8" rx="1.4" fill="none" stroke={look.iris} strokeWidth="1.4" />
                <rect x="6.2" y="-1.6" width="2" height="3.2" rx="0.4" fill={look.iris} />
                <rect x="-5.4" y="-2.4" width="10" height="4.8" fill={look.glow} />
              </g>
            ) : (
              <g transform={`translate(${gx}, ${gy})`}>
                <circle r="8.2" fill={look.iris} />
                <circle r="3.6" fill={look.pupil} />
                <circle cx="-2.2" cy="-2.4" r="1.5" fill={look.accent} />
                {look.sparkle && <circle cx="3.2" cy="2.4" r="0.8" fill="#fff" />}
              </g>
            )}
          </g>
        </g>
      )}
    </g>
  )
}

export function TwinEyes({ look, mood, gaze = { x: 0, y: 0 }, winkLeft, size = 86 }: Props) {
  const visor = look.shape === 'visor' || look.shape === 'laser'
  const leftClosed = winkLeft || look.shape === 'wink' || mood === 'grumpy'
  const uid = useId().replace(/:/g, '')

  return (
    <svg viewBox="-48 -24 96 48" width={size} height={size * 0.5} overflow="visible">
      <defs>
        <filter id={`glow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {visor ? (
        <g filter={`url(#glow-${uid})`}>
          <rect x="-40" y="-8" width="80" height="16" rx="8" fill={look.sclera} />
          <rect x="-36" y="-5" width="72" height="10" rx="5" fill={look.iris} />
          <rect x="-18" y="-2.4" width="22" height="4.6" rx="2" fill={look.accent} opacity="0.7" />
        </g>
      ) : (
        <g filter={`url(#glow-${uid})`}>
          <g transform="translate(-18, 0)">
            <OneEye look={look} mood={mood} gaze={gaze} closed={leftClosed} maskId={`${uid}-l`} />
          </g>
          <g transform="translate(18, 0)">
            <OneEye look={look} mood={mood} gaze={gaze} maskId={`${uid}-r`} />
          </g>
        </g>
      )}
    </svg>
  )
}

export function EyePortrait({ look, size = 72 }: { look: EyeLook; size?: number }) {
  return (
    <div
      className="grid place-items-center overflow-hidden rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 40% 35%, ${look.glow}, ${look.sclera} 42%, #0a090c)`,
        boxShadow: `inset 0 0 0 1px ${look.glow}55, 0 0 24px ${look.glow}33`,
      }}
    >
      <TwinEyes look={look} mood="idle" size={size * 0.92} />
    </div>
  )
}

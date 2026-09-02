import { useId, useRef, useState, type PointerEvent } from 'react'
import type { Edition } from '../data/catalog'
import type { EyeLook } from '../data/eyes'
import type { Mood } from '../store'
import { TwinEyes } from './TwinEyes'

type Props = {
  edition: Edition
  eye: EyeLook
  mood: Mood
  size?: number
  serial?: number
  interactive?: boolean
  compact?: boolean
  onPet?: () => void
  onShake?: () => void
}

const CHASSIS: Record<string, { stops: [string, string][]; stroke: string; bezel: string }> = {
  platinum: {
    stops: [
      ['0%', '#ffffff'],
      ['25%', '#f8fafc'],
      ['50%', '#e2e8f0'],
      ['70%', '#cbd5e1'],
      ['88%', '#94a3b8'],
      ['100%', '#64748b'],
    ],
    stroke: '#94a3b8',
    bezel: '#94a3b8',
  },
  champagne: {
    stops: [
      ['0%', '#ffffff'],
      ['20%', '#fdf6ec'],
      ['40%', '#f7e7ce'],
      ['65%', '#e8d3b9'],
      ['85%', '#d4b996'],
      ['100%', '#bfa07a'],
    ],
    stroke: '#d4b996',
    bezel: '#d4b996',
  },
  sapphire: {
    stops: [
      ['0%', '#ffffff'],
      ['18%', '#dbeafe'],
      ['40%', '#60a5fa'],
      ['68%', '#2563eb'],
      ['88%', '#1d4ed8'],
      ['100%', '#0f172a'],
    ],
    stroke: '#1d4ed8',
    bezel: '#1d4ed8',
  },
  ruby: {
    stops: [
      ['0%', '#fff1f2'],
      ['18%', '#fda4af'],
      ['42%', '#f43f5e'],
      ['70%', '#e11d48'],
      ['88%', '#9f1239'],
      ['100%', '#4c0519'],
    ],
    stroke: '#be123c',
    bezel: '#be123c',
  },
  rose: {
    stops: [
      ['0%', '#ffffff'],
      ['20%', '#ffe4e6'],
      ['45%', '#fecdd3'],
      ['68%', '#fb7185'],
      ['85%', '#e11d48'],
      ['100%', '#9f1239'],
    ],
    stroke: '#fb7185',
    bezel: '#e11d48',
  },
  diamond: {
    stops: [
      ['0%', '#ffffff'],
      ['30%', '#f8fafc'],
      ['60%', '#e2e8f0'],
      ['85%', '#cbd5e1'],
      ['100%', '#94a3b8'],
    ],
    stroke: '#e2e8f0',
    bezel: '#cbd5e1',
  },
  obsidian: {
    stops: [
      ['0%', '#3f3f46'],
      ['40%', '#27272a'],
      ['80%', '#18181b'],
      ['100%', '#09090b'],
    ],
    stroke: '#52525b',
    bezel: '#3f3f46',
  },
  crystal: {
    stops: [
      ['0%', 'rgba(255,255,255,0.95)'],
      ['50%', 'rgba(247,231,206,0.55)'],
      ['100%', 'rgba(212,185,150,0.35)'],
    ],
    stroke: '#d4b996',
    bezel: '#d4b996',
  },
  steel: {
    stops: [
      ['0%', '#e2e8f0'],
      ['45%', '#94a3b8'],
      ['70%', '#64748b'],
      ['100%', '#334155'],
    ],
    stroke: '#64748b',
    bezel: '#475569',
  },
}

const BODY = `M 200 48
C 214 74, 230 116, 252 134
C 278 152, 332 152, 360 168
C 378 180, 378 206, 360 220
C 334 238, 288 252, 276 278
C 264 308, 274 354, 258 372
C 242 388, 220 376, 198 360
C 176 376, 154 388, 138 372
C 122 354, 132 308, 120 278
C 108 252, 62 238, 36 220
C 18 206, 18 180, 36 168
C 64 152, 118 152, 144 134
C 166 116, 182 74, 196 48
Z`

const INNER = `M 200 58
C 212 80, 226 118, 246 134
C 270 150, 320 150, 344 164
C 358 174, 358 194, 344 206
C 322 222, 280 234, 268 258
C 258 284, 266 326, 252 340
C 238 354, 218 344, 200 330
C 182 344, 162 354, 148 340
C 134 326, 142 284, 132 258
C 120 234, 78 222, 56 206
C 42 194, 42 174, 56 164
C 80 150, 130 150, 154 134
C 174 118, 188 80, 200 58
Z`

function mouthPath(mood: Mood) {
  if (mood === 'grumpy') return 'M 188 238 Q 200 228 212 238'
  if (mood === 'pet' || mood === 'warm') return 'M 184 232 Q 200 248 216 232'
  if (mood === 'anxious' || mood === 'cold') return 'M 192 236 Q 200 240 208 236'
  if (mood === 'dizzy') return 'M 186 236 Q 194 244 200 236 Q 206 228 214 238'
  return 'M 188 234 Q 200 244 212 234'
}

export function Superboy({
  edition,
  eye,
  mood,
  size = 380,
  serial = 184,
  interactive,
  compact,
  onPet,
  onShake,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [gaze, setGaze] = useState({ x: 0, y: 0 })
  const last = useRef({ t: 0, x: 0, y: 0 })
  const uid = useId().replace(/:/g, '')
  const chassis = CHASSIS[edition.id] ?? CHASSIS.platinum!

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = wrap.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1
    setTilt({ x: ny * -8, y: nx * 12 })
    setGaze({ x: nx, y: ny })
    const now = performance.now()
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    const dt = now - last.current.t
    last.current = { t: now, x: e.clientX, y: e.clientY }
    if (dt > 0 && dt < 40 && Math.hypot(dx, dy) / dt > 2.4) onShake?.()
  }

  return (
    <div
      ref={wrap}
      className={`relative ${interactive ? 'cursor-pointer' : ''}`}
      style={{
        width: size,
        height: size,
        maxWidth: '100%',
        perspective: compact ? undefined : 900,
      }}
      onPointerMove={interactive ? onMove : undefined}
      onPointerLeave={() => {
        setTilt({ x: 0, y: 0 })
        setGaze({ x: 0, y: 0 })
      }}
      onClick={interactive ? onPet : undefined}
    >
      {!compact && (
        <div
          className="absolute inset-[10%] rounded-full blur-3xl opacity-70"
          style={{
            background: `radial-gradient(circle, ${edition.metal.glow}66, transparent 70%)`,
            animation: 'pulse-glow 5s ease-in-out infinite',
          }}
        />
      )}
      <div
        className={`relative ${compact ? '' : `mood-${mood}`}`}
        style={
          compact
            ? undefined
            : {
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }
        }
      >
        <svg viewBox="0 0 400 400" className="relative w-full overflow-visible drop-shadow-2xl">
          <defs>
            <linearGradient id={`body-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              {chassis.stops.map(([off, color]) => (
                <stop key={off} offset={off} stopColor={color} />
              ))}
            </linearGradient>
            <radialGradient id={`glass-${uid}`} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            <filter id={`glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id={`shadow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000" floodOpacity="0.35" />
            </filter>
            <clipPath id={`clip-${uid}`}>
              <path d={BODY} />
            </clipPath>
          </defs>

          <g>
            <circle cx="200" cy="34" r="22" fill="none" stroke={chassis.stroke} strokeWidth="7" />
            <circle cx="200" cy="34" r="16" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          </g>

          <g filter={`url(#shadow-${uid})`}>
            <path
              d={BODY}
              fill={`url(#body-${uid})`}
              stroke={chassis.stroke}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d={INNER} fill="none" stroke="#fff" strokeWidth="1.8" opacity="0.65" />
          </g>

          <g>
            <circle cx="156" cy="112" r="10.5" fill="#0f172a" stroke={chassis.stroke} strokeWidth="1.5" />
            <circle cx="156" cy="112" r="6" fill="#0284c7" opacity="0.85" />
            <circle cx="154" cy="110" r="2" fill="#fff" opacity="0.9" />
          </g>
          <g>
            <circle cx="244" cy="112" r="3.5" fill="#09090b" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <circle cx="244" cy="112" r="1.5" fill="#18181b" />
          </g>

          <circle cx="200" cy="204" r="82" fill="#0f172a" stroke={chassis.bezel} strokeWidth="3" />
          <circle cx="200" cy="204" r="77" fill={`url(#glass-${uid})`} stroke="#000" strokeWidth="2" />

          <path
            d={mouthPath(mood)}
            fill="none"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {(mood === 'pet' || mood === 'warm') && (
            <>
              <circle cx="158" cy="228" r="8" fill="#ff8aa0" opacity="0.28" />
              <circle cx="242" cy="228" r="8" fill="#ff8aa0" opacity="0.28" />
            </>
          )}

          <path
            d="M 140 165 C 160 142, 240 142, 260 165 C 240 155, 160 155, 140 165 Z"
            fill="rgba(255,255,255,0.28)"
          />

          {!compact && (
            <text
              x="200"
              y="268"
              textAnchor="middle"
              fill="rgba(255,255,255,0.45)"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="11"
              letterSpacing="1.4"
            >
              {String(serial).padStart(4, '0')}
            </text>
          )}

          <g pointerEvents="none">
            <polygon points="200,68 204,75 212,76 204,78 200,86 196,78 188,76 196,75" fill="#fff" opacity="0.95" />
            <polygon points="329,168 334,176 344,178 334,180 329,188 324,180 314,178 324,176" fill="#fff" opacity="0.9" />
            <path
              d="M 215 56 C 245 105, 335 155, 355 175"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {mood === 'cold' && (
            <g clipPath={`url(#clip-${uid})`} opacity="0.32">
              <path d={BODY} fill="#b8e8ff" />
            </g>
          )}
        </svg>

        <div
          className="pointer-events-none absolute z-10"
          style={{
            left: '50%',
            top: '51%',
            transform: 'translate(-50%, -58%)',
            width: compact ? '38%' : '36%',
          }}
        >
          <TwinEyes
            look={eye}
            mood={mood}
            gaze={compact ? { x: 0, y: 0 } : gaze}
            winkLeft={mood === 'grumpy' || eye.shape === 'wink'}
            size={compact ? Math.max(36, size * 0.38) : Math.max(88, size * 0.34)}
          />
        </div>
      </div>
      {interactive && !compact && (
        <p className="mt-1 text-center font-mono text-[10px] tracking-[0.22em] text-mist/50 uppercase">
          touch him · shake him · he is looking at you
        </p>
      )}
    </div>
  )
}

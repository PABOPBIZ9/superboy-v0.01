import { useEffect, useRef, useState } from 'react'
import { clamp } from '../lib/format'
import { useStore } from '../store'

type Body = { x: number; y: number; vx: number; vy: number; flying: boolean }

export function FlickArena() {
  const { flickScore, pins, addScore, edition } = useStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const body = useRef<Body>({ x: 260, y: 430, vx: 0, vy: 0, flying: false })
  const drag = useRef<{ x: number; y: number } | null>(null)
  const aim = useRef<{ x: number; y: number } | null>(null)
  const [msg, setMsg] = useState('Flick Superboy into the golden bullseye.')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const raw = canvas.getContext('2d')
    if (!raw) return
    const gfx: CanvasRenderingContext2D = raw
    const board = canvas
    let raf = 0

    const rings = [
      { r: 36, pts: 300, label: 'GOLDEN 300' },
      { r: 78, pts: 120, label: '120' },
      { r: 122, pts: 40, label: '40' },
      { r: 168, pts: 10, label: '10' },
    ]
    const cx = 260
    const cy = 188

    function reset() {
      body.current = { x: 260, y: 430, vx: 0, vy: 0, flying: false }
    }

    function tick() {
      const b = body.current
      if (b.flying) {
        b.vy += 0.18
        b.vx *= 0.992
        b.vy *= 0.992
        b.x += b.vx
        b.y += b.vy
        if (b.x < 18 || b.x > 502) b.vx *= -0.72
        if (b.y < 18) b.vy *= -0.72
        b.x = clamp(b.x, 18, 502)
        if (b.y > 470 && Math.abs(b.vy) < 0.8) {
          b.flying = false
          const d = Math.hypot(b.x - cx, b.y - cy)
          const hit = rings.find((r) => d <= r.r)
          if (hit) {
            addScore(hit.pts)
            setMsg(`${hit.label} · +${hit.pts} pts`)
          } else {
            setMsg('Off the enamel. Flick again.')
          }
          window.setTimeout(reset, 900)
        }
        if (b.y > 520) {
          setMsg('Out of bounds. He is judging you.')
          reset()
        }
      }

      gfx.clearRect(0, 0, 520, 500)
      gfx.fillStyle = '#fafafa'
      gfx.fillRect(0, 0, 520, 500)

      rings
        .slice()
        .reverse()
        .forEach((ring, i) => {
          gfx.beginPath()
          gfx.arc(cx, cy, ring.r, 0, Math.PI * 2)
          gfx.fillStyle = i === 3 ? '#e7c27a' : i % 2 === 0 ? '#fff7e8' : '#f3ead8'
          gfx.fill()
          gfx.strokeStyle = '#e7c27a44'
          gfx.stroke()
        })
      gfx.fillStyle = '#070708'
      gfx.font = '10px IBM Plex Mono'
      gfx.textAlign = 'center'
      gfx.fillText('BULLSEYE', cx, cy + 4)

      if (drag.current && aim.current) {
        gfx.strokeStyle = '#e7c27aaa'
        gfx.setLineDash([4, 4])
        gfx.beginPath()
        gfx.moveTo(b.x, b.y)
        gfx.lineTo(b.x - (aim.current.x - b.x), b.y - (aim.current.y - b.y))
        gfx.stroke()
        gfx.setLineDash([])
      }

      const g = gfx.createRadialGradient(b.x - 6, b.y - 8, 2, b.x, b.y, 16)
      g.addColorStop(0, edition.metal.hi)
      g.addColorStop(1, edition.metal.lo)
      gfx.beginPath()
      gfx.arc(b.x, b.y, 16, 0, Math.PI * 2)
      gfx.fillStyle = g
      gfx.fill()
      gfx.fillStyle = '#070708'
      gfx.beginPath()
      gfx.arc(b.x, b.y, 7, 0, Math.PI * 2)
      gfx.fill()
      gfx.fillStyle = '#fff'
      gfx.beginPath()
      gfx.arc(b.x - 2.5, b.y - 1, 1.4, 0, Math.PI * 2)
      gfx.arc(b.x + 2.5, b.y - 1, 1.4, 0, Math.PI * 2)
      gfx.fill()

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    function pos(e: PointerEvent) {
      const r = board.getBoundingClientRect()
      return {
        x: ((e.clientX - r.left) / r.width) * 520,
        y: ((e.clientY - r.top) / r.height) * 500,
      }
    }

    const down = (e: PointerEvent) => {
      const p = pos(e)
      const b = body.current
      if (Math.hypot(p.x - b.x, p.y - b.y) < 28 && !b.flying) {
        drag.current = p
        aim.current = p
        board.setPointerCapture(e.pointerId)
      }
    }
    const move = (e: PointerEvent) => {
      if (!drag.current) return
      aim.current = pos(e)
    }
    const up = () => {
      if (!drag.current || !aim.current) return
      const b = body.current
      b.vx = (b.x - aim.current.x) * 0.18
      b.vy = (b.y - aim.current.y) * 0.18
      b.flying = true
      drag.current = null
      aim.current = null
    }

    board.addEventListener('pointerdown', down)
    board.addEventListener('pointermove', move)
    board.addEventListener('pointerup', up)
    board.addEventListener('pointercancel', up)
    return () => {
      cancelAnimationFrame(raf)
      board.removeEventListener('pointerdown', down)
      board.removeEventListener('pointermove', move)
      board.removeEventListener('pointerup', up)
      board.removeEventListener('pointercancel', up)
    }
  }, [addScore, edition.metal.hi, edition.metal.lo])

  return (
    <section className="border-y border-slate-200 bg-[#f7f4ee] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker">Crazy Bones Physical Flick Battler</p>
            <h2 className="display mt-3 text-4xl sm:text-5xl">
              flick him into the bullseye
              <span className="serif font-normal text-gold italic"> to unlock pins.</span>
            </h2>
            <p className="mt-4 text-mist">
              Just like vintage Crazy Bones, Superboy&apos;s weighted Swiss-watch star corners are
              engineered to bounce, spin, and stick landings. Flick him onto real physical boards
              to win digital twin badges!
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="panel rounded-3xl p-5">
                <p className="font-mono text-[10px] tracking-widest text-mist/40 uppercase">Total score</p>
                <p className="display mt-1 text-4xl">{flickScore} PTS</p>
              </div>
              <div className="panel rounded-3xl p-5">
                <p className="font-mono text-[10px] tracking-widest text-mist/40 uppercase">Collectible pins</p>
                <p className="display mt-1 text-4xl">{pins} Unlocked</p>
              </div>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-mist">
              <li>★ Genesis 2026 Founder Pin — unlocked</li>
              <li className={pins >= 2 ? 'text-gold' : 'opacity-40'}>★ Golden Bullseye Pin — 300 pts</li>
              <li className={pins >= 3 ? 'text-gold' : 'opacity-40'}>★ Flick Champion Enamel — 900 pts</li>
            </ul>
          </div>
          <div className="panel overflow-hidden rounded-[32px] p-3">
            <canvas
              ref={canvasRef}
              width={520}
              height={500}
              className="h-auto w-full touch-none rounded-[24px]"
            />
            <p className="px-3 py-3 text-center font-mono text-[11px] tracking-widest text-gold/70 uppercase">
              {msg}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

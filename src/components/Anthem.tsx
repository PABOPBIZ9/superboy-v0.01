import { useEffect, useRef, useState } from 'react'
import { TRACKS } from '../data/tracks'
import { useStore } from '../store'

function formatTime(n: number) {
  if (!Number.isFinite(n)) return '0:00'
  const m = Math.floor(n / 60)
  const s = Math.floor(n % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function Anthem() {
  const { trackId, playing, playTrack, togglePlay, mood } = useStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const track = TRACKS.find((t) => t.id === trackId) ?? TRACKS[0]!
  const [t, setT] = useState(0)
  const [d, setD] = useState(0)

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.src = track.src
    if (playing) void el.play().catch(() => undefined)
  }, [track.src, playing])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    if (playing) void el.play().catch(() => undefined)
    else el.pause()
  }, [playing])

  return (
    <section id="anthem" className="mx-auto max-w-[1440px] px-5 py-24 lg:px-8">
      <audio
        ref={audioRef}
        onTimeUpdate={() => setT(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setD(audioRef.current?.duration ?? 0)}
        onEnded={() => {
          const i = TRACKS.findIndex((x) => x.id === trackId)
          const next = TRACKS[(i + 1) % TRACKS.length]!
          playTrack(next.id)
        }}
      />
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="kicker">the anthem</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">
            he already has a
            <span className="serif font-normal text-gold italic"> theme song.</span>
          </h2>
          <p className="mt-5 max-w-xl text-mist">
            Eleven studio cuts. Original, first-person, hardstyle, male vocals. Play it into the
            room and watch the gyro pretend it is dancing.
          </p>

          <div className="panel mt-8 rounded-[32px] p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-gold uppercase">Now playing</p>
                <h3 className="mt-1 font-display text-3xl">{track.title}</h3>
                <p className="text-sm text-mist">{track.mix}</p>
              </div>
              <button
                type="button"
                onClick={togglePlay}
                className="h-14 w-14 rounded-full bg-void font-display text-xl text-paper"
              >
                {playing ? 'II' : '▶'}
              </button>
            </div>
            <div className="mt-6 flex h-10 items-end gap-1">
              {Array.from({ length: 42 }, (_, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-full bg-gold/80"
                  style={{
                    height: playing ? `${18 + ((i * 37) % 82)}%` : '18%',
                    animation: playing ? `equalize ${0.7 + (i % 5) * 0.12}s ease-in-out ${i * 0.04}s infinite` : 'none',
                    opacity: mood === 'dizzy' ? 1 : 0.85,
                  }}
                />
              ))}
            </div>
            <input
              className="range mt-5 w-full"
              type="range"
              min={0}
              max={d || 0}
              value={t}
              onChange={(e) => {
                const el = audioRef.current
                if (!el) return
                el.currentTime = Number(e.target.value)
                setT(el.currentTime)
              }}
            />
            <div className="mt-2 flex justify-between font-mono text-[10px] text-mist/40">
              <span>{formatTime(t)}</span>
              <span>{formatTime(d)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {TRACKS.map((tr) => {
            const on = tr.id === trackId
            return (
              <button
                key={tr.id}
                type="button"
                onClick={() => playTrack(tr.id)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${
                  on ? 'border-gold/60 bg-gold/10' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>
                  <span className="block font-display text-lg">{tr.title}</span>
                  <span className="font-mono text-[10px] text-mist/45">{tr.mix}</span>
                </span>
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  {on && playing ? 'playing' : 'select'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

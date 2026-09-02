import { useState, type FormEvent } from 'react'
import { REPLIES, WILDLIFE } from '../data/lore'
import { useStore, type Mood } from '../store'
import { Superboy } from './Superboy'

const ACTIONS: { mood: Mood; label: string; hint: string }[] = [
  { mood: 'pet', label: 'Pet Head', hint: 'Loyalty pulse' },
  { mood: 'dizzy', label: 'Shake Gyro', hint: '6-axis overflow' },
  { mood: 'grumpy', label: 'Flick Off', hint: 'Respect pending' },
  { mood: 'battery', label: 'Battery Check', hint: 'Thumbs-up decode' },
  { mood: 'cold', label: 'Simulate Cold Environment', hint: '4°C ambient' },
  { mood: 'warm', label: 'Simulate Warm Sunlight', hint: 'Pocket summer' },
  { mood: 'anxious', label: 'Loud Room', hint: 'Crowd spike' },
]

export function NeuralLab() {
  const s = useStore()
  const [draft, setDraft] = useState('')

  function act(mood: Mood) {
    s.setMood(mood)
    const line =
      mood === 'pet'
        ? 'Mmm. More of that. I am a luxury object and also a baby.'
        : mood === 'dizzy'
          ? '*sees stars that are not me* You did that on purpose.'
          : mood === 'grumpy'
            ? 'Wow. Flicked. I will be dramatic about this for 96 hours.'
            : mood === 'battery'
              ? `*winks* Battery at ${s.battery}%! Ready for heroic quests!`
              : mood === 'cold'
                ? 'This is illegal. Put me in a pocket immediately.'
                : mood === 'warm'
                  ? 'Sunlight on sapphire. I am retiring from perceiving.'
                  : 'Too many voices. Hold the star. Be the quiet.'
    s.boySay(line)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    s.say(text)
    setDraft('')
    const hit = REPLIES.find((r) => r.test.test(text))
    if (/sing|anthem|song/i.test(text)) s.playTrack()
    window.setTimeout(() => {
      s.boySay(hit?.line ?? 'I heard that with the directional mic. Logging it as lore.')
    }, 380)
  }

  return (
    <section id="live" className="relative border-y border-slate-200 bg-[#f7f4ee] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">Interactive Superboy Neural Lab</p>
            <h2 className="display mt-3 text-4xl sm:text-6xl">
              touch him, shake him,
              <span className="serif font-normal text-gold italic"> talk to him.</span>
            </h2>
            <p className="mt-4 max-w-xl text-mist">
              Perceives you in real-time through embedded vision, acoustics, inertial gyro, and
              temperature sensors. No screen time, pure physical lucky companionship.
            </p>
          </div>
          <div className="panel flex items-center gap-5 rounded-full px-5 py-3 font-mono text-[11px] tracking-widest uppercase">
            <span className="text-gold">★ Superboy Neural Active</span>
            <span>{s.temp}°C</span>
            <span>{s.battery}%</span>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="panel relative overflow-hidden rounded-[32px] p-6 sm:p-10">
            <div className="flex justify-center">
              <Superboy
                edition={s.edition}
                eye={s.eye}
                mood={s.mood}
                serial={s.serial}
                size={420}
                interactive
                onPet={() => act('pet')}
                onShake={() => act('dizzy')}
              />
            </div>
            <p className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 font-mono text-xs leading-relaxed text-gold">
              Thought: “{s.thought}”
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ACTIONS.map((a) => (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => act(a.mood)}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-left hover:border-gold/40"
                >
                  <span className="block text-sm">{a.label}</span>
                  <span className="font-mono text-[10px] text-mist">{a.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="panel flex h-full min-h-[540px] flex-col rounded-[32px] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="kicker">★ Superboy AI Core Mind</p>
                <h3 className="mt-1 font-display text-2xl">Gemini 3.7 Flash</h3>
              </div>
              <span className="rounded-full border border-gold/30 px-3 py-1 font-mono text-[10px] text-gold">
                neural active
              </span>
            </div>
            <div className="mt-5 flex-1 space-y-3 overflow-y-auto pr-1">
              {s.chat.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.from === 'boy'
                      ? 'bg-slate-50 text-void'
                      : 'ml-auto bg-gold/15 text-gold'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs hover:border-gold/40"
                onClick={() => {
                  s.playTrack()
                  s.boySay('Ahem. *tiny speaker engages* I was born with a theme song.')
                }}
              >
                🎵 Sing hero tune
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs hover:border-gold/40"
                onClick={() => {
                  s.setMood('idle', 'Perception sweep: partner located. Lighting: cinematic. Threats: none.')
                  s.boySay('Perception check: you are still my favorite moving object.')
                }}
              >
                👁️ Perception check
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs hover:border-gold/40"
                onClick={() => s.boySay(WILDLIFE[Math.floor(Math.random() * WILDLIFE.length)]!)}
              >
                ★ Wild hero lore
              </button>
            </div>
            <form onSubmit={onSubmit} className="mt-4 flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Whisper to Superboy..."
                className="h-12 flex-1 rounded-full border border-slate-200 bg-white px-5 text-sm outline-none placeholder:text-mist"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-void px-5 font-mono text-[11px] tracking-widest text-paper uppercase"
              >
                send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

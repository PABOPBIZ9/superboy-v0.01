import { useMemo, useState } from 'react'
import { EYES, FAMILIES, RARITY_META, type FamilyId } from '../data/eyes'
import { useStore } from '../store'
import { EyePortrait } from './TwinEyes'

const PAGE = 24

export function EyeGallery() {
  const { eye, setEye } = useStore()
  const [family, setFamily] = useState<FamilyId>('all')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return EYES.filter((e) => {
      if (family !== 'all' && e.family !== family) return false
      if (!query) return true
      return `${e.name} ${e.id} ${e.rarity} ${e.description}`.toLowerCase().includes(query)
    })
  }, [family, q])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE))
  const slice = filtered.slice(page * PAGE, page * PAGE + PAGE)

  function randomize() {
    const pick = EYES[Math.floor(Math.random() * EYES.length)]!
    setEye(pick.id)
    setFamily('all')
    setQ('')
    setPage(Math.floor((pick.index - 1) / PAGE))
  }

  return (
    <section id="eyes" className="border-y border-slate-200 bg-[#f7f4ee] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker">Generative Genetic OLED DNA</p>
            <h2 className="display mt-3 text-4xl sm:text-6xl">
              eye looks
              <span className="serif font-normal text-gold italic"> 400 variants</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={randomize}
            className="h-11 rounded-full border border-gold/40 px-5 font-mono text-[11px] tracking-[0.18em] text-gold uppercase"
          >
            Randomize Gene
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {FAMILIES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setFamily(f.id)
                setPage(0)
              }}
              className={`rounded-full px-4 py-2 font-mono text-[10px] tracking-widest uppercase ${
                family === f.id ? 'bg-void text-paper' : 'border border-slate-200 text-mist'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setPage(0)
          }}
          placeholder="Search 400 traits..."
          className="mt-6 h-12 w-full max-w-md rounded-full border border-slate-200 bg-white px-5 text-sm outline-none placeholder:text-mist"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {slice.map((look) => {
            const active = look.id === eye.id
            const meta = RARITY_META[look.rarity]
            return (
              <article
                key={look.id}
                className={`panel rounded-3xl p-5 ${active ? 'ring-1 ring-gold/70' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <EyePortrait look={look} size={72} />
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase" style={{ color: meta.color }}>
                      {meta.label} ({look.chance})
                    </p>
                    <h3 className="mt-1 truncate font-display text-lg">{look.name}</h3>
                    <p className="font-mono text-[10px] text-mist">{look.id}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-mist">{look.description}</p>
                <button
                  type="button"
                  onClick={() => setEye(look.id)}
                  className="mt-4 w-full rounded-full border border-slate-200 py-2 font-mono text-[10px] tracking-widest uppercase hover:border-gold/50"
                >
                  {active ? 'Equipped' : 'Apply to Companion →'}
                </button>
              </article>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 font-mono text-[11px] tracking-widest text-mist uppercase">
          <span>
            {filtered.length} looks · page {page + 1}/{pages}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-30"
            >
              prev
            </button>
            <button
              type="button"
              disabled={page >= pages - 1}
              onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
              className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-30"
            >
              next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

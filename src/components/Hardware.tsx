import { BATCH_MAX, EDITIONS, GENESIS_PRICE, supplyCopy } from '../data/catalog'
import { usd } from '../lib/format'
import { useStore } from '../store'
import { Superboy } from './Superboy'

export function Hardware() {
  const { edition, setEdition, setDrawer, eye, mood, serial } = useStore()

  return (
    <section id="hardware" className="mx-auto max-w-[1440px] px-5 py-24 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="kicker">★ Batch 01 Genesis · {BATCH_MAX.toLocaleString()} Max Supply</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">
            hardware editions
            <span className="serif font-normal text-gold italic"> & supply.</span>
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            Strict {BATCH_MAX.toLocaleString()} maximum supply worldwide for {usd(GENESIS_PRICE)}.
            Numbered batches with cryptographic provenance. Once an edition reaches 0 supply, it
            is permanently locked.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {EDITIONS.map((e) => {
          const sold = e.left <= 0
          const active = edition.id === e.id
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => setEdition(e.id)}
              className={`panel overflow-hidden rounded-3xl p-4 text-left transition ${
                active ? 'ring-1 ring-gold/70' : ''
              } ${sold ? 'opacity-60' : ''}`}
            >
              <div
                className="relative mb-4 flex h-36 items-center justify-center overflow-hidden rounded-2xl"
                style={{
                  background: `linear-gradient(145deg, ${e.metal.hi}, ${e.metal.mid} 40%, ${e.metal.lo})`,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ffffff66,transparent_45%)]" />
                <Superboy
                  edition={e}
                  eye={eye}
                  mood={active ? mood : 'idle'}
                  serial={serial}
                  size={148}
                  compact
                />
                <span className="absolute top-3 left-3 rounded-full bg-black/40 px-2 py-1 font-mono text-[9px] tracking-widest text-white uppercase">
                  {sold ? 'Sold Out' : e.badge}
                </span>
              </div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase">★ {e.sku}</p>
              <h3 className="mt-1 font-display text-lg leading-tight">{e.name}</h3>
              <p className="mt-2 line-clamp-2 text-xs text-mist">{e.material}</p>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-lg">{usd(e.price)}</span>
                <span className="font-mono text-[10px] text-mist">
                  {sold ? '(0 left)' : `(${supplyCopy(e)})`}
                </span>
              </div>
              <p className="mt-3 font-mono text-[10px] tracking-widest uppercase text-gold">
                {sold ? 'Sold Out' : `Pre-Order ${usd(e.price)}`}
              </p>
            </button>
          )
        })}
      </div>

      <div className="panel mt-8 grid gap-8 rounded-[32px] p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10">
        <div>
          <p className="kicker">Hardware Chassis</p>
          <h3 className="mt-2 font-display text-4xl">{edition.name}</h3>
          <p className="mt-3 max-w-xl text-mist">{edition.blurb}</p>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
            {[
              ['Material', edition.material],
              ['Finish', edition.finish],
              ['Weight', edition.weight],
              ['Battery', `${edition.battery} on single charge`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] tracking-widest text-mist uppercase">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div className="flex justify-center">
            <Superboy edition={edition} eye={eye} mood={mood} serial={serial} size={220} compact />
          </div>
          <button
            type="button"
            disabled={edition.left <= 0}
            onClick={() => setDrawer(true)}
            className="h-12 rounded-full bg-void font-mono text-[11px] tracking-[0.18em] text-paper uppercase disabled:opacity-40"
          >
            {edition.left <= 0
              ? 'Sold out · never recast'
              : `Pre-Order ${edition.name} • ${usd(edition.price)}`}
          </button>
        </div>
      </div>
    </section>
  )
}

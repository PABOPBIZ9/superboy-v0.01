import { ACCESSORIES } from '../data/catalog'
import { usd } from '../lib/format'
import { useStore } from '../store'

export function Accessories() {
  const { accessories, toggleAccessory } = useStore()
  const ids = new Set(accessories.map((a) => a.id))

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 lg:px-8">
      <p className="kicker">accessories & dock station.</p>
      <h2 className="display mt-3 max-w-2xl text-4xl sm:text-5xl">
        Precision accessories crafted to enhance charging, protection,
        <span className="serif font-normal text-gold italic"> and daily wearable utility.</span>
      </h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ACCESSORIES.map((a) => {
          const on = ids.has(a.id)
          return (
            <article key={a.id} className="panel flex flex-col rounded-3xl p-6">
              <span className="font-mono text-[10px] tracking-[0.2em] text-gold/70">{a.sku}</span>
              <h3 className="mt-3 font-display text-2xl leading-tight">{a.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{a.blurb}</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-xl">{usd(a.price)}</p>
                  <p className="font-mono text-[10px] text-mist">({a.left} left)</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleAccessory(a.id)}
                  className={`h-10 rounded-full px-4 font-mono text-[10px] tracking-widest uppercase ${
                    on ? 'bg-gold text-void' : 'border border-slate-300'
                  }`}
                >
                  {on ? 'Added' : 'Add to Order'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

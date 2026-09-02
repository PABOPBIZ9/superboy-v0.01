import { BATCH_MAX, GENESIS_PRICE } from '../data/catalog'
import { usd } from '../lib/format'
import { useStore } from '../store'

export function Preorder() {
  const s = useStore()
  if (!s.drawer) return null
  const sold = s.edition.left <= 0

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-slate-900/40 backdrop-blur-sm">
      <button type="button" className="h-full flex-1" onClick={() => s.setDrawer(false)} aria-label="Close" />
      <aside className="h-full w-full max-w-md overflow-y-auto border-l border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="kicker">Batch 01 · {BATCH_MAX.toLocaleString()} max</p>
          <button type="button" onClick={() => s.setDrawer(false)} className="font-mono text-xs text-mist">
            close
          </button>
        </div>
        <h2 className="mt-4 font-display text-3xl">Reserve your Superboy.</h2>
        <p className="mt-2 text-sm text-mist">
          Genesis chassis is {usd(GENESIS_PRICE)} across every metal. Serial held at checkout.
          Accessories ship in the same crate.
        </p>

        <div className="mt-8 space-y-3">
          <Row
            label={sold ? 'Genesis sold out' : s.edition.name}
            meta={
              sold
                ? 'This finish is permanently locked'
                : `${s.edition.material} · ${s.edition.left}${s.edition.run ? ` / ${s.edition.run}` : ''} left`
            }
            value={sold ? 0 : s.edition.price}
          />
          <Row label={`Eye genome · ${s.eye.name}`} meta={s.eye.id} value={0} />
          {s.accessories.map((a) => (
            <Row key={a.id} label={a.name} meta={a.sku} value={a.price} />
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between border-t border-slate-200 pt-4">
          <span className="font-mono text-[10px] tracking-widest text-mist uppercase">Due today</span>
          <span className="display text-4xl">{usd(sold ? 0 : s.total)}</span>
        </div>

        <form
          className="mt-8 space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            s.boySay('Serial reserved. I will wait in the crate like a very expensive secret.')
            s.setDrawer(false)
          }}
        >
          <input className="field" placeholder="Email" type="email" required />
          <input className="field" placeholder="Full name" required />
          <input className="field" placeholder="Shipping city" required />
          <button
            type="submit"
            disabled={sold}
            className="h-12 w-full rounded-full bg-void font-mono text-[11px] tracking-[0.18em] text-paper uppercase disabled:opacity-40"
          >
            Lock genesis serial · {usd(GENESIS_PRICE)}
          </button>
        </form>
        <p className="mt-4 font-mono text-[10px] leading-relaxed text-mist">
          Demo checkout — no charge in this build. 3,500 max supply. Limited editions will not be
          minted again once exhausted.
        </p>
      </aside>
    </div>
  )
}

function Row({ label, meta, value }: { label: string; meta: string; value: number }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4">
      <div>
        <p className="text-sm">{label}</p>
        <p className="font-mono text-[10px] text-mist">{meta}</p>
      </div>
      <p className="font-mono text-sm">{value ? usd(value) : 'included'}</p>
    </div>
  )
}

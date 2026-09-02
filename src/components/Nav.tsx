import { BATCH_MAX, BATCH_REMAINING, GENESIS_PRICE } from '../data/catalog'
import { NAV } from '../data/lore'
import { usd } from '../lib/format'
import { useStore } from '../store'

export function Nav() {
  const { setDrawer, playing, togglePlay } = useStore()
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-[#fffdfa]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-5 py-3 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="h-7 w-7" />
          <span className="display text-[15px] tracking-[0.22em] uppercase">superboy</span>
        </a>
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 overflow-x-auto text-[10px] tracking-[0.12em] text-mist uppercase lg:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="whitespace-nowrap hover:text-gold">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <span className="hidden font-mono text-[10px] tracking-[0.18em] text-gold uppercase sm:block">
            Batch 01: {BATCH_REMAINING.toLocaleString()} / {BATCH_MAX.toLocaleString()} left
          </span>
          <button
            type="button"
            onClick={togglePlay}
            className="hidden h-9 items-center rounded-full border border-slate-200 px-3 font-mono text-[10px] tracking-[0.16em] uppercase hover:border-gold/50 md:inline-flex"
          >
            {playing ? 'pause audio' : 'audio'}
          </button>
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="h-9 rounded-full bg-void px-4 font-mono text-[10px] font-medium tracking-[0.16em] text-paper uppercase"
          >
            pre-order {usd(GENESIS_PRICE)}
          </button>
        </div>
      </div>
    </header>
  )
}

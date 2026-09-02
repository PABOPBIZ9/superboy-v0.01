import { EDITIONS, GENESIS_PRICE, HERO_FINISH_IDS } from '../data/catalog'
import { usd } from '../lib/format'
import { useStore } from '../store'
import { Superboy } from './Superboy'

const stars = Array.from({ length: 42 }, (_, i) => ({
  left: `${(i * 17) % 100}%`,
  top: `${(i * 29) % 100}%`,
  delay: `${(i % 7) * 0.35}s`,
  size: i % 5 === 0 ? 3 : 1,
}))

export function Hero() {
  const { edition, eye, mood, serial, setEdition, setMood, setDrawer } = useStore()
  const heroFinishes = HERO_FINISH_IDS.map((id) => EDITIONS.find((e) => e.id === id)!)

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-20">
      <div className="starfield pointer-events-none absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute -left-24 top-24 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full blur-[140px]"
        style={{ background: `${edition.metal.glow}22` }}
      />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-8 px-5 pb-16 md:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pt-4">
        <div className="order-2 md:order-1">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-gold uppercase">
              Superboy Hardware Standard
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
              $13B Collectible Parity
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-mist uppercase">
              PSA GEM MINT 10 DNA
            </span>
          </div>
          <h1 className="serif text-[clamp(3.1rem,10vw,7.1rem)] leading-[0.78] text-void italic">
            he&apos;s
            <br />
            just
            <br />
            your
            <br />
            <span className="gold-text not-italic">superboy.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-mist">
            Superboy is an adorable, star-crested wearable digital pet that behaves like a real
            living companion.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="h-12 rounded-full bg-void px-6 font-mono text-[11px] tracking-[0.18em] text-paper uppercase"
            >
              Pre-Order Superboy {usd(GENESIS_PRICE)}
            </button>
            <a
              href="#anthem"
              className="h-12 rounded-full border border-slate-300 px-6 font-mono text-[11px] leading-[48px] tracking-[0.18em] uppercase hover:border-gold/50"
            >
              Play Superboy Audio
            </a>
            <a
              href="#live"
              className="h-12 rounded-full border border-slate-300 px-6 font-mono text-[11px] leading-[48px] tracking-[0.18em] uppercase hover:border-gold/50"
            >
              Interactive Simulator
            </a>
            <a
              href="#eyes"
              className="h-12 rounded-full border border-slate-300 px-6 font-mono text-[11px] leading-[48px] tracking-[0.18em] uppercase hover:border-gold/50"
            >
              View 400 Eye Looks
            </a>
          </div>
          <p className="mt-6 max-w-lg font-mono text-[11px] leading-relaxed tracking-wide text-mist">
            ★ Batch 01 Genesis Run: 3,500 Max Supply for {usd(GENESIS_PRICE)}. Limited editions
            will not be minted again once exhausted.
          </p>
        </div>

        <div className="relative order-1 flex flex-col items-center md:order-2">
          <Superboy
            edition={edition}
            eye={eye}
            mood={mood}
            serial={serial}
            size={420}
            interactive
            onPet={() => setMood('pet')}
            onShake={() => setMood('dizzy')}
          />
          <div className="mt-2 w-full max-w-md">
            <p className="mb-1 font-mono text-[10px] tracking-[0.22em] text-mist uppercase">
              Select Finish
            </p>
            <p className="mb-3 font-mono text-[10px] tracking-[0.18em] text-gold uppercase">
              Active Finish: {edition.hue}
            </p>
            <div className="grid grid-cols-5 gap-2">
              {heroFinishes.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setEdition(e.id)}
                  className={`rounded-2xl border bg-white p-2 text-left transition ${
                    edition.id === e.id ? 'border-gold/70 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span
                    className="mb-2 block h-8 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${e.metal.hi}, ${e.metal.mid} 55%, ${e.metal.lo})`,
                    }}
                  />
                  <span className="block font-mono text-[9px] tracking-wider text-void uppercase">
                    {e.id === 'rose' ? 'rose gold' : e.id}
                  </span>
                  <span className="block font-mono text-[9px] text-mist">
                    {usd(e.price)} · {e.left} left
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden border-y border-slate-200 py-3">
        <div className="flex w-max gap-10 animate-[marquee_28s_linear_infinite] font-mono text-[11px] tracking-[0.28em] text-mist uppercase">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-10 px-6">
              {[
                'standalone device',
                'swiss luxury chassis',
                '400 unique eyes',
                'encrypted nfc mesh',
                'psa gem mint 10 dna',
                'fan-first syndicate',
                '3,500 max supply',
                '$88.88 genesis',
              ].map((t) => (
                <span key={`${k}-${t}`}>★ {t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

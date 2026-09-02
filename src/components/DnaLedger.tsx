import { useMemo } from 'react'
import { EDITIONS, FEATURED_SERIAL } from '../data/catalog'
import { getEye } from '../data/eyes'
import { hexHash } from '../lib/hash'
import { usd } from '../lib/format'
import { useStore } from '../store'
import { EyePortrait } from './TwinEyes'

function grades(serial: number) {
  if (serial === FEATURED_SERIAL) {
    return { centr: '10.0 (50/50)', corn: '10.0', edge: '9.9', surf: '10.0', label: 'PSA GEM MT 10' }
  }
  const n = (serial * 17) % 10
  const surf = n > 7 ? '10.0' : n > 4 ? '9.8' : '9.5'
  return {
    centr: n > 6 ? '10.0 (50/50)' : '9.8',
    corn: n > 5 ? '10.0' : '9.7',
    edge: n > 3 ? '9.9' : '9.6',
    surf,
    label: n > 6 ? 'PSA GEM MT 10' : 'MINT 9',
  }
}

export function DnaLedger() {
  const { serial, setSerial, edition, eye } = useStore()
  const g = grades(serial)
  const hash = useMemo(() => hexHash(`superboy-genesis-${serial}`), [serial])
  const holder = useMemo(() => hexHash(`holder-${serial}`, 8), [serial])
  const chassis = serial === FEATURED_SERIAL ? EDITIONS.find((e) => e.id === 'diamond') ?? edition : edition
  const look = serial === FEATURED_SERIAL ? getEye('eye-009') : eye
  const value = serial === FEATURED_SERIAL ? 1450 : Math.round(chassis.price * (1.4 + (serial % 9) / 10))

  return (
    <section id="dna" className="mx-auto max-w-[1440px] px-5 py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="kicker">Fanatics Collectibles & Topps Grading Parity</p>
          <h2 className="display mt-3 text-4xl sm:text-6xl">
            every superboy has an
            <span className="serif font-normal text-gold italic"> on-chain soul.</span>
          </h2>
          <p className="mt-5 text-mist">
            Bridging the multi-billion dollar collectibles trading card industry with physical
            Swiss-watch hardware and verifiable cryptographic DNA.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ['Fanatics Collectibles (Topps) Benchmark', '~$5.0 Billion', 'Physical card grading & vault standard'],
              ['Licensed Physical Collectibles Market', '$7.0B - $8.0B', 'Limited-edition physical production with zero re-casts. Authenticated via tamper-evident NFC cryptographic seal.'],
              ['Secondary Floor & Liquidity', '0.24 ETH', '~$680 USD Secondary Floor'],
            ].map(([k, v, d]) => (
              <article key={k} className="panel rounded-3xl p-5">
                <p className="font-mono text-[10px] tracking-widest text-mist uppercase">{k}</p>
                <p className="display mt-2 text-3xl text-gold">{v}</p>
                <p className="mt-2 text-xs text-mist">{d}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="slab relative overflow-hidden rounded-[28px] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-gold uppercase">{g.label}</p>
              <p className="mt-2 font-display text-2xl">2026 SUPERBOY GENESIS #{serial}</p>
              <p className="text-sm text-mist">{chassis.name}</p>
            </div>
            <EyePortrait look={look} size={64} />
          </div>
          <div className="mt-6 grid grid-cols-4 gap-2 font-mono text-[10px] tracking-widest uppercase">
            {[
              ['CENTR', g.centr],
              ['CORN', g.corn],
              ['EDGE', g.edge],
              ['SURF', g.surf],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-gold/20 p-3">
                <p className="text-mist/40">{k}</p>
                <p className="mt-1 text-gold">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-[11px] break-all text-mist">{hash}</p>
          <p className="mt-2 font-mono text-[10px] text-mist">
            Holder 0x{holder.slice(2, 5)}…{holder.slice(-4)} · Secondary {usd(value)} (
            {(value / chassis.price).toFixed(1)}x mint)
          </p>
          <span className="absolute top-6 right-6 rotate-12 rounded-full border border-gold/40 px-3 py-1 font-mono text-[10px] tracking-widest text-gold uppercase">
            Authentic
          </span>
        </div>
      </div>

      <div className="panel mt-12 rounded-[32px] p-6 md:p-8">
        <p className="kicker">Provenance Explorer</p>
        <h3 className="mt-2 font-display text-3xl">verify your physical hardware serial.</h3>
        <div className="mt-6 flex flex-wrap gap-3">
          <input
            type="number"
            value={serial}
            onChange={(e) => setSerial(Number(e.target.value) || 1)}
            className="h-12 w-36 rounded-full border border-slate-200 bg-white px-5 font-mono text-sm"
          />
          <button
            type="button"
            className="h-12 rounded-full bg-void px-6 font-mono text-[11px] tracking-widest text-paper uppercase"
          >
            Verify Hash
          </button>
        </div>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-mist uppercase">Status</dt>
            <dd className="mt-1 text-gold">Immutable on-chain record</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-mist uppercase">Gene hash</dt>
            <dd className="mt-1 break-all font-mono text-xs">{hash}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-mist uppercase">Finish</dt>
            <dd className="mt-1">{chassis.material}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-widest text-mist uppercase">Foil</dt>
            <dd className="mt-1">{look.rarity === 'grail' ? 'Ultra-Rare Holo Foil' : look.name}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

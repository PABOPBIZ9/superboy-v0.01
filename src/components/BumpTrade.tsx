import { useState } from 'react'
import { EDITIONS } from '../data/catalog'
import { useStore } from '../store'
import { Superboy } from './Superboy'

export function BumpTrade() {
  const s = useStore()
  const [flash, setFlash] = useState(false)

  function bump() {
    setFlash(true)
    s.bump()
    window.setTimeout(() => setFlash(false), 700)
  }

  return (
    <section id="bump" className="mx-auto max-w-[1440px] px-5 py-24 lg:px-8">
      <p className="kicker">Offline Device-to-Device Mesh Contact</p>
      <h2 className="display mt-3 max-w-3xl text-4xl sm:text-6xl">
        superboys communicate
        <span className="serif font-normal text-gold italic"> in the wild.</span>
      </h2>
      <p className="mt-5 max-w-2xl text-mist">
        When two physical Superboys come into contact, their internal NFC antennas collide. They
        swap rare eye looks, spread meme behaviors, and trade genetic traits without internet or
        phones.
      </p>

      <div className="mt-12 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <article className="panel rounded-[32px] p-6 text-center">
          <p className="font-mono text-[10px] tracking-widest text-gold/70 uppercase">
            Superboy Alpha #{s.serial}
          </p>
          <p className="mt-1 text-sm text-mist">Hyperactive & Heroic</p>
          <div className="flex justify-center">
            <Superboy edition={s.edition} eye={s.eye} mood={flash ? 'pet' : s.mood} size={280} serial={s.serial} />
          </div>
          <p className="font-display text-lg">{s.eye.name}</p>
          <p className="font-mono text-[11px] text-mist/40">Bond Level {s.bond}</p>
        </article>

        <div className="flex flex-col items-center gap-3">
          <div
            className={`grid h-24 w-24 place-items-center rounded-full border font-mono text-[10px] tracking-widest uppercase ${
              flash ? 'border-gold bg-gold text-void' : 'border-gold/40 text-gold'
            }`}
          >
            NFC
            <br />
            BUMP
          </div>
          <button
            type="button"
            onClick={bump}
            className="h-12 rounded-full bg-void px-6 font-mono text-[10px] tracking-[0.16em] text-paper uppercase"
          >
            Simulate Physical NFC Bump & Trait Swap
          </button>
        </div>

        <article className="panel rounded-[32px] p-6 text-center">
          <p className="font-mono text-[10px] tracking-widest text-gold/70 uppercase">Superboy Wild #429</p>
          <p className="mt-1 text-sm text-mist">Mischievous & Sassy</p>
          <div className="flex justify-center">
            <Superboy
              edition={EDITIONS.find((e) => e.id === 'ruby') ?? s.edition}
              eye={s.wildEye}
              mood={flash ? 'dizzy' : 'idle'}
              size={280}
              serial={429}
            />
          </div>
          <p className="font-display text-lg">{s.wildEye.name}</p>
          <p className="font-mono text-[11px] text-mist">Bond Level {s.wildBond}</p>
        </article>
      </div>
    </section>
  )
}

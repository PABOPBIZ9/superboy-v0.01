import { SENSORS } from '../data/catalog'

export function Story() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="kicker">the companion</p>
          <h2 className="display mt-4 max-w-md text-5xl text-void sm:text-6xl">
            he notices the room
            <span className="serif font-normal text-gold italic"> before you do.</span>
          </h2>
        </div>
        <p className="max-w-2xl text-lg leading-relaxed text-mist">
          Superboy perceives its environment through an optical vision camera, directional
          microphone, temperature sensor, and 6-axis gyroscope. Bring him into a loud environment
          and he gets anxious. Leave him in the cold and he shivers. Shake him and he gets dizzy
          and mad at you. Give him a thumbs up to check the battery level, or flick him off if you
          feel like making him grumpy.
        </p>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SENSORS.map((s, i) => (
          <article key={s.id} className="panel rounded-3xl p-6">
            <span className="font-mono text-[10px] text-gold/70">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mt-3 font-display text-xl">{s.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">{s.copy}</p>
          </article>
        ))}
      </div>
      <p className="mt-12 max-w-3xl text-sm leading-relaxed text-mist">
        Each device ships with a distinct personality, iconic star-facets, and a unique set of
        eyes. There are over 400 looks, each with associated rarity. Superboys communicate when
        they come into contact in the wild via encrypted NFC mesh. They swap eyes, spread
        behaviors, and play together. Superboy is a completely standalone device, built to the
        standard of a Swiss luxury watch with solid platinum titanium, sapphire crystal, and
        marine alloy.
      </p>
    </section>
  )
}

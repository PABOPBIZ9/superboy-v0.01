export function Footer() {
  return (
    <footer className="border-t border-slate-200 py-16">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-8 px-5 lg:px-8">
        <div>
          <p className="display text-3xl">superboy</p>
          <p className="serif mt-2 text-xl text-gold italic">he&apos;s just your superboy.</p>
          <p className="mt-4 max-w-md text-sm text-mist">
            © 2026 lilguy inc. All rights reserved. Superboy autonomous collectible hardware
            ($88.88). Fanatics & Topps Provenance Standard. ★ Batch 01 Genesis Run (3,500 Max
            Supply).
          </p>
        </div>
        <div className="flex flex-wrap gap-5 font-mono text-[11px] tracking-[0.18em] uppercase text-mist">
          <a href="https://instagram.com" className="hover:text-gold">
            instagram
          </a>
          <a href="https://www.tiktok.com/@cryptoevangelist1" className="hover:text-gold">
            tiktok
          </a>
          <a href="https://x.com" className="hover:text-gold">
            twitter / x
          </a>
          <a href="mailto:press@superboy.world" className="hover:text-gold">
            contact
          </a>
          <a href="#fans" className="hover:text-gold">
            press kit
          </a>
        </div>
      </div>
    </footer>
  )
}

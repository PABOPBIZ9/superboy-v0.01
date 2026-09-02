import { useState } from 'react'

const ACTS = [
  {
    id: 'liv',
    kicker: '01 — Sovereign/VC Model vs. LIV Golf',
    title: 'The Saudi PIF Funding Constraints',
    body: 'Saudi Public Investment Fund poured >$5 Billion into bankrolling LIV Golf since June 2022. It announced it would only guarantee funding through the 2026 season as Governor Yasir Al-Rumayyan departs the board to redirect capital into domestic initiatives. LIV hired investment bank Ducera to transition from a single-backer model to a multi-partner corporate syndicate. To prevent high-profile stars from returning to the PGA Tour, players were conceded majority commercial rights to their Name, Image, and Likeness (NIL). Top-heavy burn models collapse when unanchored to organic fans.',
    notes: [
      { tag: 'PIF', t: 'Top-heavy burn model collapsing' },
      { tag: 'NIL', t: 'Conceding equity to maintain survival' },
      { tag: '$27B', t: 'VC cross-promotional fragility' },
    ],
  },
  {
    id: 'extract',
    kicker: '02 — Top-Down Extraction: Pokémon & GameStop',
    title: 'Pokémon packs & GameStop',
    body: 'The collectibles landscape financializes hobbies to prop up revenue. Pokémon card prices are up ~1,350% since 2020, inflated by crypto inflows, grade games, and Discord syndicates — Polymarket even listed floor-value contracts. GameStop’s collectibles mix jumped from 14% of revenue in 2021 to 42% in Q1 2026 (~$1.2B trailing). Power Packs with a guaranteed PSA 8+ Charizard sit next to a $56B eBay bid. Meanwhile a hijacked Roaring Kitty post pumped a memecoin, then $700k vanished. Retail coordination without cryptographic rails is a surface for extraction.',
    notes: [
      { tag: 'PTCG', t: 'Hype loop, not fandom' },
      { tag: 'GME', t: 'Shareholders over hobbyists' },
      { tag: 'RKC', t: 'Coordination hijack' },
    ],
  },
  {
    id: 'blueprint',
    kicker: '03 — Grassroots Economic Blueprint',
    title: 'Fan-aligned hardware syndicate',
    body: 'Superboy is the opposite machine: an Unincorporated Autonomous Syndicate, not a Delaware roll-up. Fan-equity points accrue from attention, making, and verified physical contact — not seed rounds. Fair-launch VRF drops, proof-of-hobbyist consensus, and a 5% secondary fee split 50/50 between the original holder-creator and a community treasury. No sovereign backer to vanish. No 20%+ EBITDA skim routed to a boardroom.',
    notes: [
      { tag: 'UAS', t: 'Zero institutional debt' },
      { tag: 'PoF', t: 'Proof of fanhood' },
      { tag: '5%', t: 'Fee recapture, not markup' },
    ],
  },
] as const

const MATRIX = [
  {
    name: 'LIV Golf League',
    capital: 'Saudi PIF & Recent Multi-Partner Syndicates',
    risk: 'Lost millions annually; single-backer dependency broke down in mid-2026.',
    grass: 'Low; struggles to convert nine-figure player contracts into organic broadcast viewership.',
  },
  {
    name: 'Fanatics Monopolies',
    capital: 'Institutional VCs, BlackRock, Fidelity',
    risk: 'Antitrust scrutiny over league-exclusive 10-to-20-year licensing monopolies.',
    grass: 'Extraction-based; prioritizes driving fans toward native sports betting & high-margin gear.',
  },
  {
    name: 'Superboy UAS Syndicate',
    capital: 'Decentralized Fan Treasury & Direct Hardware Backers',
    risk: 'Zero institutional debt; immune to sovereign pullbacks or corporate margin quotas.',
    grass: '100% Native; fan equity grows with physical contact, mesh interaction & verifiable provenance.',
  },
]

const PHASES = [
  { n: '01', t: 'Community trust', d: 'UAS, not a C-Corp. Non-dilutable weight for verified participation.' },
  { n: '02', t: 'Creator pipeline', d: 'Refuse exclusivity locks. Route attention to fan-owned storefronts.' },
  { n: '03', t: 'Fair launch', d: 'VRF drops. No botting, no corporate hoards, no insider recasts.' },
  { n: '04', t: 'Capital realign', d: 'Secondary fees to creator + treasury. Strike extractive platforms.' },
]

export function FanFirst() {
  const [act, setAct] = useState(0)
  const current = ACTS[act]!

  return (
    <section id="fans" className="border-y border-slate-200 bg-[#f7f4ee] py-24">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
        <p className="kicker">Economic Paradigm Report & Architecture</p>
        <h2 className="display mt-3 max-w-4xl text-4xl sm:text-6xl">
          fan-first architecture
          <span className="serif font-normal text-gold italic"> vs. institutional capital flywheel.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-mist">
          A comprehensive breakdown of sovereign wealth burn, corporate extraction, and how
          decentralized fan-first hardware syndicates reclaim sovereignty.
        </p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {[
            { h: 'PIF → LIV', p: '>$5B in, funding guaranteed only through 2026. A single backer is a single point of failure.' },
            { h: 'Fanatics $27B', p: 'BlackRock & Fidelity paper. Flag football funding snapped when geopolitics moved the venue.' },
            { h: 'Superboy 0 VC', p: 'Direct hardware. Mesh contact. Provenance. The fan is the balance sheet.' },
          ].map((c) => (
            <article key={c.h} className="panel rounded-3xl p-6">
              <h3 className="font-display text-2xl">{c.h}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{c.p}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {ACTS.map((a, i) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAct(i)}
              className={`rounded-full px-4 py-2 font-mono text-[10px] tracking-widest uppercase ${
                act === i ? 'bg-void text-paper' : 'border border-slate-200 text-mist'
              }`}
            >
              {a.kicker}
            </button>
          ))}
        </div>

        <article className="panel mt-6 rounded-[32px] p-6 md:p-10">
          <p className="kicker">{current.kicker}</p>
          <h3 className="mt-3 font-display text-3xl sm:text-4xl">{current.title}</h3>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-mist">{current.body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {current.notes.map((n) => (
              <div key={n.tag} className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="font-mono text-xs tracking-widest text-gold">{n.tag}</p>
                <p className="mt-2 text-sm text-mist">{n.t}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="font-mono text-[10px] tracking-[0.2em] text-mist/40 uppercase">
                <th className="border-b border-slate-200 py-3 pr-4">Ecosystem Segment</th>
                <th className="border-b border-slate-200 py-3 pr-4">Primary Capital Source</th>
                <th className="border-b border-slate-200 py-3 pr-4">Structural Vulnerability</th>
                <th className="border-b border-slate-200 py-3">Grassroots Alignment</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row) => (
                <tr key={row.name} className={row.name.startsWith('Superboy') ? 'text-gold' : 'text-mist'}>
                  <td className={`border-b border-slate-200 py-5 pr-4 font-display text-lg ${row.name.startsWith('Superboy') ? 'text-gold' : 'text-void'}`}>{row.name}</td>
                  <td className="border-b border-slate-200 py-5 pr-4">{row.capital}</td>
                  <td className="border-b border-slate-200 py-5 pr-4">{row.risk}</td>
                  <td className="border-b border-slate-200 py-5">{row.grass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {PHASES.map((p) => (
            <article key={p.n} className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="font-mono text-[10px] text-gold">{p.n}</p>
              <h4 className="mt-2 font-display text-xl">{p.t}</h4>
              <p className="mt-2 text-sm text-mist">{p.d}</p>
            </article>
          ))}
        </div>

        <div className="panel mt-12 grid gap-8 rounded-[32px] p-6 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div>
            <p className="kicker">20% EBITDA recapture</p>
            <h3 className="mt-3 font-display text-3xl">5% secondary fee. 50 / 50 split.</h3>
            <p className="mt-4 text-sm leading-relaxed text-mist">
              Centralized collectibles run 20%+ EBITDA on a $1.6B base. Superboy hardcodes a 5%
              protocol fee on secondary transfer: half to the original creator-hobbyist, half to
              the community treasury. No revolving credit facility. No board vote to reallocate.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-gold/15 p-6">
              <p className="display text-5xl text-gold">50%</p>
              <p className="mt-2 text-sm">Creator royalty vault</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="display text-5xl">50%</p>
              <p className="mt-2 text-sm">Community treasury · quadratic PoF vote</p>
            </div>
            <div className="col-span-2 rounded-3xl border border-slate-200 p-6">
              <p className="font-mono text-[10px] tracking-widest text-mist/40 uppercase">Liquidity</p>
              <p className="mt-1">0% centralized debt · AMM pools, not a $700M credit line</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

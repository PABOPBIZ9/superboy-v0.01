import { mulberry32 } from '../lib/hash'

export const FAMILIES = [
  { id: 'all', label: 'All Looks (400)' },
  { id: 'hero', label: 'Hero Star-Burst' },
  { id: 'cyber', label: 'Cyber & Visor' },
  { id: 'grail', label: '1-of-1 Grail Foil' },
  { id: 'glitch', label: 'Matrix Glitch' },
  { id: 'kawaii', label: 'Kawaii & Hearts' },
  { id: 'cosmic', label: 'Cosmic Void' },
  { id: 'classic', label: 'Classic Hero' },
] as const

export type FamilyId = (typeof FAMILIES)[number]['id']
export type Rarity = 'common' | 'uncommon' | 'rare' | 'mythic' | 'grail'
export type EyeShape =
  | 'round'
  | 'star'
  | 'slit'
  | 'heart'
  | 'visor'
  | 'spiral'
  | 'pixel'
  | 'crescent'
  | 'galaxy'
  | 'glitch'
  | 'wink'
  | 'laser'
  | 'foil'

export type EyeLook = {
  id: string
  index: number
  name: string
  family: Exclude<FamilyId, 'all'>
  rarity: Rarity
  chance: string
  shape: EyeShape
  sclera: string
  iris: string
  pupil: string
  glow: string
  accent: string
  sparkle: boolean
  description: string
}

export const RARITY_META: Record<Rarity, { label: string; chance: string; color: string }> = {
  common: { label: 'Common', chance: '60%', color: '#9aa3ad' },
  uncommon: { label: 'Uncommon', chance: '25%', color: '#7fd1a8' },
  rare: { label: 'Rare', chance: '10%', color: '#7aa7ff' },
  mythic: { label: 'Mythic', chance: '4%', color: '#c9a6ff' },
  grail: { label: '1-of-1 Grail', chance: '1%', color: '#e7c27a' },
}

const FEATURED: EyeLook[] = [
  {
    id: 'eye-001',
    index: 1,
    name: 'Hero Star-Burst',
    family: 'hero',
    rarity: 'uncommon',
    chance: '25%',
    shape: 'star',
    sclera: '#fff8ea',
    iris: '#f2c14e',
    pupil: '#1a1208',
    glow: '#ffe08a',
    accent: '#ffffff',
    sparkle: true,
    description: 'Big glowing twin hero stars with glossy white anime catchlights and cosmic sparkle.',
  },
  {
    id: 'eye-002',
    index: 2,
    name: 'Hypnotic Spiral',
    family: 'classic',
    rarity: 'common',
    chance: '60%',
    shape: 'spiral',
    sclera: '#f4efe6',
    iris: '#7b5cff',
    pupil: '#160e28',
    glow: '#9d86ff',
    accent: '#d9d0ff',
    sparkle: false,
    description: 'Rotating optical-illusion spiral when Superboy gets dizzy or shaken.',
  },
  {
    id: 'eye-003',
    index: 3,
    name: 'Ruby Cyber Laser',
    family: 'cyber',
    rarity: 'rare',
    chance: '10%',
    shape: 'laser',
    sclera: '#1a0608',
    iris: '#ff3b4e',
    pupil: '#ffd0d4',
    glow: '#ff5a6e',
    accent: '#ff8a96',
    sparkle: false,
    description: 'Pulsing red horizontal hero visor inspired by 80s mecha champions.',
  },
  {
    id: 'eye-004',
    index: 4,
    name: 'Kawaii Heart-Lock',
    family: 'kawaii',
    rarity: 'common',
    chance: '60%',
    shape: 'heart',
    sclera: '#fff0f4',
    iris: '#ff6b9d',
    pupil: '#4a1024',
    glow: '#ff9ec0',
    accent: '#ffffff',
    sparkle: true,
    description: 'Pumping pink hearts triggered whenever you gently pet Superboy’s head.',
  },
  {
    id: 'eye-005',
    index: 5,
    name: 'Hero Wink & Smirk',
    family: 'hero',
    rarity: 'common',
    chance: '60%',
    shape: 'wink',
    sclera: '#fff8ea',
    iris: '#3d7cff',
    pupil: '#0c1220',
    glow: '#8bb4ff',
    accent: '#ffffff',
    sparkle: false,
    description: 'Playful one-eye wink with a tiny curved electronic hero smirk.',
  },
  {
    id: 'eye-006',
    index: 6,
    name: 'Feline Night Vision',
    family: 'classic',
    rarity: 'uncommon',
    chance: '25%',
    shape: 'slit',
    sclera: '#e8ffe8',
    iris: '#3dff7a',
    pupil: '#04140a',
    glow: '#7dff9a',
    accent: '#d4ffd8',
    sparkle: false,
    description: 'Slit emerald pupils that expand in low-light ambient environments.',
  },
  {
    id: 'eye-007',
    index: 7,
    name: 'Matrix Code Glitch',
    family: 'glitch',
    rarity: 'rare',
    chance: '10%',
    shape: 'glitch',
    sclera: '#04140a',
    iris: '#3dff6a',
    pupil: '#9affb0',
    glow: '#2aff66',
    accent: '#b8ffc4',
    sparkle: false,
    description: 'Cascading digital glyphs falling down the circular OLED display.',
  },
  {
    id: 'eye-008',
    index: 8,
    name: 'Sleepy Crescent',
    family: 'classic',
    rarity: 'common',
    chance: '60%',
    shape: 'crescent',
    sclera: '#fff6e8',
    iris: '#c9a36a',
    pupil: '#2a1c10',
    glow: '#e7c27a',
    accent: '#ffffff',
    sparkle: false,
    description: 'Droopy half-moon eyelids when Superboy is placed in a quiet dark room.',
  },
  {
    id: 'eye-009',
    index: 9,
    name: 'Gold Foil 1-of-1 Grail',
    family: 'grail',
    rarity: 'grail',
    chance: '1%',
    shape: 'foil',
    sclera: '#1a1408',
    iris: '#e7c27a',
    pupil: '#fff4d0',
    glow: '#ffe08a',
    accent: '#ffffff',
    sparkle: true,
    description: 'Verifiable holographic 24K shimmering star iris with a PSA 10 on-chain stamp.',
  },
  {
    id: 'eye-010',
    index: 10,
    name: 'Cosmic Stardust Void',
    family: 'cosmic',
    rarity: 'mythic',
    chance: '4%',
    shape: 'galaxy',
    sclera: '#070712',
    iris: '#6b4dff',
    pupil: '#12081c',
    glow: '#9d7cff',
    accent: '#ffd6ff',
    sparkle: true,
    description: 'Swirling miniature galaxy with floating nebulae and micro-meteors.',
  },
  {
    id: 'eye-011',
    index: 11,
    name: 'Retro 8-Bit Pip-Boy',
    family: 'glitch',
    rarity: 'uncommon',
    chance: '25%',
    shape: 'pixel',
    sclera: '#0c1a10',
    iris: '#7cff4a',
    pupil: '#041408',
    glow: '#9aff66',
    accent: '#d4ffb0',
    sparkle: false,
    description: 'Low-fi 16×16 pixel animated eyes mimicking vintage Game Boy pocket heroes.',
  },
  {
    id: 'eye-012',
    index: 12,
    name: 'Supernova Glitch Void',
    family: 'cosmic',
    rarity: 'mythic',
    chance: '4%',
    shape: 'glitch',
    sclera: '#050508',
    iris: '#ff4ad4',
    pupil: '#ffffff',
    glow: '#ff7ae0',
    accent: '#7ad4ff',
    sparkle: true,
    description: 'Pure dark-energy core ringed by an ultra-bright chromatic aberration flare.',
  },
]

const PREFIX = [
  'Hero', 'Cosmic', 'Neon', 'Lunar', 'Solar', 'Void', 'Crystal', 'Ember', 'Frost', 'Pulse',
  'Echo', 'Nova', 'Prism', 'Ghost', 'Storm', 'Quiet', 'Rapid', 'Soft', 'Iron', 'Velvet',
  'Chrome', 'Amber', 'Ion', 'Halo', 'Drift', 'Pixel', 'Feral', 'Saint', 'Rogue', 'Tiny',
]
const CORE = [
  'Star', 'Heart', 'Visor', 'Spiral', 'Crescent', 'Galaxy', 'Spark', 'Bloom', 'Ring', 'Flare',
  'Prism', 'Wave', 'Comet', 'Iris', 'Beacon', 'Orbit', 'Glyph', 'Petal', 'Fang', 'Crown',
]
const SUFFIX = [
  'Burst', 'Lock', 'Glitch', 'Void', 'Gleam', 'Drift', 'Core', 'Halo', 'Pulse', 'Gaze',
  'Wink', 'Storm', 'Hush', 'Foil', 'Signal', 'Bloom',
]

const PALETTES = [
  ['#fff8ea', '#f2c14e', '#1a1208', '#ffe08a', '#ffffff'],
  ['#f4efe6', '#3d7cff', '#0c1220', '#8bb4ff', '#dce8ff'],
  ['#fff0f4', '#ff6b9d', '#4a1024', '#ff9ec0', '#ffffff'],
  ['#e8ffe8', '#3dff7a', '#04140a', '#7dff9a', '#d4ffd8'],
  ['#070712', '#6b4dff', '#12081c', '#9d7cff', '#ffd6ff'],
  ['#04140a', '#3dff6a', '#9affb0', '#2aff66', '#b8ffc4'],
  ['#1a0608', '#ff3b4e', '#ffd0d4', '#ff5a6e', '#ff8a96'],
  ['#0b151c', '#7ad4ff', '#041018', '#b8ecff', '#ffffff'],
  ['#1a1408', '#e7c27a', '#fff4d0', '#ffe08a', '#ffffff'],
  ['#140818', '#ff4ad4', '#ffffff', '#ff7ae0', '#7ad4ff'],
  ['#f6fff8', '#1ad4a0', '#06241c', '#7dffe0', '#ffffff'],
  ['#fff4e8', '#ff7a32', '#2a1208', '#ffb07a', '#ffffff'],
]

const FAMILY_SHAPES: Record<Exclude<FamilyId, 'all'>, EyeShape[]> = {
  hero: ['star', 'round', 'wink'],
  cyber: ['visor', 'laser', 'glitch'],
  grail: ['foil', 'star', 'galaxy'],
  glitch: ['glitch', 'pixel', 'visor'],
  kawaii: ['heart', 'round', 'wink'],
  cosmic: ['galaxy', 'spiral', 'foil'],
  classic: ['round', 'crescent', 'slit'],
}

const FAMILY_IDS = Object.keys(FAMILY_SHAPES) as Exclude<FamilyId, 'all'>[]

function rarityForIndex(i: number): Rarity {
  if (i === 8) return 'grail'
  const bucket = i % 100
  if (bucket < 1) return 'grail'
  if (bucket < 5) return 'mythic'
  if (bucket < 15) return 'rare'
  if (bucket < 40) return 'uncommon'
  return 'common'
}

function generateRest(): EyeLook[] {
  const used = new Set(FEATURED.map((e) => e.name))
  const out: EyeLook[] = []
  for (let i = 13; i <= 400; i++) {
    const rng = mulberry32(i * 9973 + 17)
    const family = FAMILY_IDS[Math.floor(rng() * FAMILY_IDS.length)]!
    const shapes = FAMILY_SHAPES[family]
    const shape = shapes[Math.floor(rng() * shapes.length)]!
    const pal = PALETTES[Math.floor(rng() * PALETTES.length)]!
    const rarity = rarityForIndex(i - 1)
    let name = ''
    let guard = 0
    do {
      name = `${PREFIX[Math.floor(rng() * PREFIX.length)]} ${CORE[Math.floor(rng() * CORE.length)]} ${SUFFIX[Math.floor(rng() * SUFFIX.length)]}`
      guard += 1
    } while (used.has(name) && guard < 12)
    used.add(name)
    const meta = RARITY_META[rarity]
    out.push({
      id: `eye-${String(i).padStart(3, '0')}`,
      index: i,
      name,
      family,
      rarity,
      chance: meta.chance,
      shape,
      sclera: pal[0],
      iris: pal[1],
      pupil: pal[2],
      glow: pal[3],
      accent: pal[4],
      sparkle: rarity === 'mythic' || rarity === 'grail' || rng() > 0.72,
      description: `${meta.label} ${family} genome. OLED iris cut ${shape}, gene #${String(i).padStart(3, '0')}.`,
    })
  }
  return out
}

export const EYES: EyeLook[] = [...FEATURED, ...generateRest()]

export function getEye(id: string) {
  return EYES.find((e) => e.id === id) ?? EYES[0]!
}

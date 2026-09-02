export type Metal = {
  hi: string
  mid: string
  lo: string
  edge: string
  glow: string
  ink: string
}

export type Edition = {
  id: string
  name: string
  hue: string
  sku: string
  badge: string
  price: number
  left: number
  run: number
  material: string
  finish: string
  weight: string
  battery: string
  blurb: string
  hero: boolean
  metal: Metal
}

export type Accessory = {
  id: string
  sku: string
  name: string
  blurb: string
  price: number
  left: number
}

export const BATCH_REMAINING = 704
export const BATCH_MAX = 3500
export const GENESIS_PRICE = 88.88
export const GENESIS_RESERVE = GENESIS_PRICE
export const COLLECTIBLE_PARITY = '$13B'
export const FEATURED_SERIAL = 184
export const HERO_FINISH_IDS = ['platinum', 'champagne', 'sapphire', 'ruby', 'rose'] as const

export function supplyCopy(e: Edition) {
  if (e.left <= 0) return '0 left'
  if (e.run > 0) return `${e.left} / ${e.run}`
  return `${e.left} left`
}

export const EDITIONS: Edition[] = [
  {
    id: 'champagne',
    name: 'champagne bling',
    hue: 'Champagne Pavé Glaze',
    sku: 'Bling Edition · 18K',
    badge: 'Bling Edition · 18K',
    price: GENESIS_PRICE,
    left: 240,
    run: 600,
    material: '18K Champagne Gold & Pavé Glaze',
    finish: 'High-Gloss Effervescent Mirror',
    weight: '42g',
    battery: '96h',
    blurb: 'Warm gold that drinks light. Pavé glaze along every star facet.',
    hero: true,
    metal: {
      hi: '#ffe7b0',
      mid: '#e0b66a',
      lo: '#8a5c22',
      edge: '#f3d089',
      glow: '#e7c27a',
      ink: '#1a1208',
    },
  },
  {
    id: 'platinum',
    name: 'iced platinum',
    hue: 'Liquid Platinum Titanium',
    sku: 'Haute Horlogerie',
    badge: 'Haute Horlogerie',
    price: GENESIS_PRICE,
    left: 188,
    run: 600,
    material: '950 Liquid Platinum & Titanium',
    finish: 'Brushed liquid mirror',
    weight: '46g',
    battery: '96h',
    blurb: 'The watchmaker’s chassis. Cold fire, silent weight, sapphire-crystal bezel.',
    hero: true,
    metal: {
      hi: '#f6f3ec',
      mid: '#c9c4bb',
      lo: '#6f6a63',
      edge: '#ece8df',
      glow: '#d9d4cc',
      ink: '#16151a',
    },
  },
  {
    id: 'ruby',
    name: 'imperial ruby',
    hue: 'Vibrant Crimson Ruby',
    sku: 'Rare Gemstone Edition',
    badge: 'Rare Gemstone Edition',
    price: GENESIS_PRICE,
    left: 190,
    run: 500,
    material: 'Faceted Pigeon-Blood Ruby Resin & Gold',
    finish: 'Inner-fire lacquer',
    weight: '44g',
    battery: '96h',
    blurb: 'Cut like a jewel, warmed like a pulse. Gold underglow along the star tips.',
    hero: true,
    metal: {
      hi: '#ff8d9a',
      mid: '#c4344a',
      lo: '#5a101c',
      edge: '#ff6d7d',
      glow: '#ff5a6e',
      ink: '#16080b',
    },
  },
  {
    id: 'rose',
    name: 'rose gold lux',
    hue: 'Rose Gold Blush Chrome',
    sku: 'Most Desired',
    badge: 'Most Desired',
    price: GENESIS_PRICE,
    left: 210,
    run: 500,
    material: '18K Rose Gold & Blush Chrome',
    finish: 'Soft blush satin',
    weight: '41g',
    battery: '96h',
    blurb: 'The one you actually live with. Warm, quiet, a little spoiled.',
    hero: true,
    metal: {
      hi: '#ffd2c4',
      mid: '#d4a08c',
      lo: '#7a4a3c',
      edge: '#f0b8a6',
      glow: '#e8b09c',
      ink: '#1a0e0c',
    },
  },
  {
    id: 'sapphire',
    name: 'royal sapphire',
    hue: 'Deep Celestial Sapphire',
    sku: 'Rare Gemstone Edition',
    badge: 'Low Stock',
    price: GENESIS_PRICE,
    left: 150,
    run: 500,
    material: 'Star Sapphire Crystal & Cobalt Alloy',
    finish: 'Deep celestial polish',
    weight: '43g',
    battery: '96h',
    blurb: 'A night-sky chassis. Asterism caught inside the crystal, cobalt in the bones.',
    hero: true,
    metal: {
      hi: '#9db6ff',
      mid: '#3d5ec8',
      lo: '#1a2a6a',
      edge: '#7f9cff',
      glow: '#5b7cff',
      ink: '#07091a',
    },
  },
  {
    id: 'diamond',
    name: 'diamond finish platinum',
    hue: 'Iced Diamond Pavé',
    sku: 'Grail · Iced-Out',
    badge: 'Grail · Iced-Out',
    price: GENESIS_PRICE,
    left: 42,
    run: 300,
    material: 'Hand-Set Diamond Pavé & Platinum',
    finish: 'Iced pavé, every facet',
    weight: '48g',
    battery: '96h',
    blurb: 'A ridiculous object. Hand-set pavé until the star reads as light.',
    hero: false,
    metal: {
      hi: '#ffffff',
      mid: '#d7e7f5',
      lo: '#6d7c8c',
      edge: '#f3fbff',
      glow: '#cfe8ff',
      ink: '#101218',
    },
  },
  {
    id: 'obsidian',
    name: 'obsidian stealth',
    hue: 'Vantablack Carbon',
    sku: 'Secret Batch',
    badge: 'Secret Batch',
    price: GENESIS_PRICE,
    left: 80,
    run: 300,
    material: 'DLC Forged Carbon & Titanium',
    finish: 'Deep Vantablack Glaze',
    weight: '38g',
    battery: '96h',
    blurb: 'No gleam. No announcement. A black star that only other Superboys notice.',
    hero: false,
    metal: {
      hi: '#3a3d46',
      mid: '#16181e',
      lo: '#050506',
      edge: '#5b616c',
      glow: '#6a7384',
      ink: '#f3eee4',
    },
  },
  {
    id: 'crystal',
    name: 'crystal',
    hue: 'Optical Clear',
    sku: 'Genesis clear',
    badge: 'Sold Out',
    price: GENESIS_PRICE,
    left: 0,
    run: 0,
    material: 'Optical Polycarbonate & Immersion Gold PCB',
    finish: 'See-through architecture',
    weight: '36g',
    battery: '96h',
    blurb: 'The inside of the machine, gold-traced and forever closed.',
    hero: false,
    metal: {
      hi: '#eaf4ff',
      mid: '#9ec0d8',
      lo: '#3d5568',
      edge: '#d6ecff',
      glow: '#8fd2ff',
      ink: '#0b151c',
    },
  },
  {
    id: 'steel',
    name: 'stainless steel',
    hue: 'Marine Steel',
    sku: 'Marine tool',
    badge: 'Sold Out',
    price: GENESIS_PRICE,
    left: 0,
    run: 0,
    material: '904L Surgical Marine Steel',
    finish: 'Bead-blast & polish',
    weight: '47g',
    battery: '96h',
    blurb: 'The diver. Built to be dropped, salt-washed, and loved anyway.',
    hero: false,
    metal: {
      hi: '#eceff3',
      mid: '#9aa3ad',
      lo: '#3e4650',
      edge: '#d5dbe3',
      glow: '#b7c2cc',
      ink: '#121416',
    },
  },
]

export const ACCESSORIES: Accessory[] = [
  {
    id: 'egg',
    sku: 'MAG-DOCK',
    name: 'superboy incubator egg',
    blurb:
      'Machined aluminum charging incubator with magnetic levitation contact and a breathing cosmic-star LED pulse.',
    price: 89,
    left: 142,
  },
  {
    id: 'pedestal',
    sku: 'TI-GR5',
    name: 'superboy pedestal dock',
    blurb:
      'Weighted stainless desk pedestal with a 15° viewing mount for bedside companion hero mode.',
    price: 69,
    left: 88,
  },
  {
    id: 'biner',
    sku: 'CLIP-01',
    name: 'hero titanium microbiner',
    blurb: 'Custom quick-release titanium carabiner to latch Superboy onto belts, bags, or chains.',
    price: 45,
    left: 310,
  },
  {
    id: 'chain',
    sku: '★ 925 SILVER',
    name: '925 sterling star hero chain',
    blurb:
      'Solid 925 sterling silver diamond-cut Cuban link, 55cm, forged to carry a Superboy on the chest.',
    price: 110,
    left: 65,
  },
]

export const SENSORS = [
  {
    id: 'vision',
    label: 'Optical vision',
    copy: 'A tiny camera reads faces, light, and thumbs-up. He knows when you look at him.',
  },
  {
    id: 'mic',
    label: 'Directional mic',
    copy: 'Bring him into a loud room and he gets anxious. Whisper and he leans in.',
  },
  {
    id: 'temp',
    label: 'Temperature',
    copy: 'Leave him in the cold and he shivers. Set him in sun and he melts into a nap.',
  },
  {
    id: 'gyro',
    label: '6-axis gyro',
    copy: 'Shake him and he gets dizzy, then mad at you. Flick him like a Crazy Bone and he commits.',
  },
]

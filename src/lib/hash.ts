export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hexHash(seed: string | number, length = 40) {
  const s = String(seed)
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  let out = ''
  let n = h >>> 0
  while (out.length < length) {
    n = Math.imul(n ^ (n >>> 15), 2246822519)
    n = Math.imul(n ^ (n >>> 13), 3266489917)
    out += (n >>> 0).toString(16).padStart(8, '0')
  }
  return `0x${out.slice(0, length)}`
}

export function starPoints(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points = 5,
  rotation = -Math.PI / 2,
) {
  const pts: { x: number; y: number }[] = []
  const count = points * 2
  for (let i = 0; i < count; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = rotation + (i * Math.PI) / points
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r })
  }
  return pts
}

export function toPath(pts: { x: number; y: number }[]) {
  return `M ${pts.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' L ')} Z`
}

export function usd(n: number) {
  const fractional = Math.abs(n % 1) > 0.001
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractional ? 2 : 0,
    maximumFractionDigits: fractional ? 2 : 0,
  }).format(n)
}

export function shortHash(hash: string, size = 6) {
  return `${hash.slice(0, size)}…${hash.slice(-4)}`
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export type Track = {
  id: string
  title: string
  mix: string
  src: string
}

const AUDIO = 'https://github.com/PABOPBIZ9/superboy-v0.01/releases/download/live-audio'

export const TRACKS: Track[] = [
  { id: 'fp1', title: 'First Person', mix: 'V1 — featured anthem', src: `${AUDIO}/first-person-v1.m4a` },
  { id: 'original', title: 'Superboy', mix: 'Original anthem', src: `${AUDIO}/superboy.m4a` },
  { id: 'fp2', title: 'First Person', mix: 'V2', src: `${AUDIO}/first-person-v2.m4a` },
  { id: 'fp2b', title: 'First Person', mix: 'V2.1', src: `${AUDIO}/first-person-v2b.m4a` },
  { id: 'hs1', title: 'Hardstyle', mix: 'Mix V1', src: `${AUDIO}/hardstyle-v1.m4a` },
  { id: 'hs2', title: 'Hardstyle', mix: 'Mix V2', src: `${AUDIO}/hardstyle-v2.m4a` },
  { id: 'mv1', title: 'Male Vocals', mix: 'V1', src: `${AUDIO}/male-v1.m4a` },
  { id: 'mv1r', title: 'Male Vocals', mix: 'V1 Remix', src: `${AUDIO}/male-v1-remix.m4a` },
  { id: 'mv2', title: 'Male Vocals', mix: 'V2', src: `${AUDIO}/male-v2.m4a` },
  { id: 'alt1', title: 'Superboy', mix: 'Studio alt 1', src: `${AUDIO}/superboy-alt-1.m4a` },
  { id: 'alt2', title: 'Superboy', mix: 'Studio alt 2', src: `${AUDIO}/superboy-alt-2.m4a` },
]

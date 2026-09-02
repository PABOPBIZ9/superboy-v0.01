import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ACCESSORIES, EDITIONS, type Accessory, type Edition } from './data/catalog'
import { getEye, type EyeLook } from './data/eyes'
import { THOUGHTS } from './data/lore'
import { TRACKS } from './data/tracks'

export type Mood = 'idle' | 'pet' | 'anxious' | 'cold' | 'warm' | 'dizzy' | 'grumpy' | 'battery'

export type ChatMsg = { id: number; from: 'boy' | 'you'; text: string }

type Store = {
  edition: Edition
  eye: EyeLook
  wildEye: EyeLook
  mood: Mood
  temp: number
  battery: number
  thought: string
  serial: number
  accessories: Accessory[]
  drawer: boolean
  trackId: string
  playing: boolean
  chat: ChatMsg[]
  bond: number
  wildBond: number
  flickScore: number
  pins: number
  setEdition: (id: string) => void
  setEye: (id: string) => void
  setWildEye: (id: string) => void
  setMood: (mood: Mood, thought?: string) => void
  setSerial: (n: number) => void
  toggleAccessory: (id: string) => void
  setDrawer: (open: boolean) => void
  playTrack: (id?: string) => void
  togglePlay: () => void
  say: (text: string) => void
  boySay: (text: string) => void
  bump: () => void
  addScore: (n: number) => void
  total: number
}

const StoreContext = createContext<Store | null>(null)

let msgId = 1

export function StoreProvider({ children }: { children: ReactNode }) {
  const [editionId, setEditionId] = useState('sapphire')
  const [eyeId, setEyeId] = useState('eye-001')
  const [wildEyeId, setWildEyeId] = useState('eye-003')
  const [mood, setMoodState] = useState<Mood>('idle')
  const [temp, setTemp] = useState(22)
  const [battery] = useState(94)
  const [thought, setThought] = useState(THOUGHTS.idle[0]!)
  const [serial, setSerial] = useState(184)
  const [accIds, setAccIds] = useState<string[]>([])
  const [drawer, setDrawer] = useState(false)
  const [trackId, setTrackId] = useState(TRACKS[0]!.id)
  const [playing, setPlaying] = useState(false)
  const [chat, setChat] = useState<ChatMsg[]>([
    {
      id: 0,
      from: 'boy',
      text: "*piko!* Greetings! I'm your Superboy AI hero companion. Tap me, shake me, or talk to me!",
    },
  ])
  const [bond, setBond] = useState(14)
  const [wildBond, setWildBond] = useState(22)
  const [flickScore, setFlickScore] = useState(0)
  const [pins, setPins] = useState(1)
  const moodTimer = useRef<number | null>(null)

  const edition = EDITIONS.find((e) => e.id === editionId) ?? EDITIONS[0]!
  const eye = getEye(eyeId)
  const wildEye = getEye(wildEyeId)
  const accessories = ACCESSORIES.filter((a) => accIds.includes(a.id))
  const total = edition.price + accessories.reduce((s, a) => s + a.price, 0)

  const setMood = useCallback((next: Mood, nextThought?: string) => {
    setMoodState(next)
    const pool = THOUGHTS[next] ?? THOUGHTS.idle
    setThought(nextThought ?? pool[Math.floor(Math.random() * pool.length)]!)
    if (next === 'cold') setTemp(4)
    if (next === 'warm') setTemp(31)
    if (next === 'idle') setTemp(22)
    if (moodTimer.current) window.clearTimeout(moodTimer.current)
    if (next !== 'idle' && next !== 'cold' && next !== 'warm') {
      moodTimer.current = window.setTimeout(() => {
        setMoodState('idle')
        setThought(THOUGHTS.idle[Math.floor(Math.random() * THOUGHTS.idle.length)]!)
      }, 2600)
    }
  }, [])

  const say = useCallback((text: string) => {
    setChat((c) => [...c, { id: msgId++, from: 'you', text }])
  }, [])

  const boySay = useCallback((text: string) => {
    setChat((c) => [...c, { id: msgId++, from: 'boy', text }])
  }, [])

  const playTrack = useCallback((id?: string) => {
    if (id) setTrackId(id)
    setPlaying(true)
  }, [])

  const bump = useCallback(() => {
    setEyeId(wildEyeId)
    setWildEyeId(eyeId)
    setBond((b) => b + 1)
    setWildBond((b) => b + 1)
    setMood('pet', 'NFC mesh handshake complete. I borrowed their eyes. They borrowed mine.')
  }, [eyeId, wildEyeId, setMood])

  const addScore = useCallback((n: number) => {
    setFlickScore((s) => {
      const next = s + n
      if (next >= 300) setPins(2)
      if (next >= 900) setPins(3)
      return next
    })
  }, [])

  useEffect(() => {
    return () => {
      if (moodTimer.current) window.clearTimeout(moodTimer.current)
    }
  }, [])

  const value = useMemo<Store>(
    () => ({
      edition,
      eye,
      wildEye,
      mood,
      temp,
      battery,
      thought,
      serial,
      accessories,
      drawer,
      trackId,
      playing,
      chat,
      bond,
      wildBond,
      flickScore,
      pins,
      setEdition: (id) => setEditionId(id),
      setEye: (id) => setEyeId(id),
      setWildEye: (id) => setWildEyeId(id),
      setMood,
      setSerial: (n) => setSerial(Math.max(1, Math.min(9999, Math.floor(n)))),
      toggleAccessory: (id) =>
        setAccIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])),
      setDrawer,
      playTrack,
      togglePlay: () => setPlaying((p) => !p),
      say,
      boySay,
      bump,
      addScore,
      total,
    }),
    [
      edition,
      eye,
      wildEye,
      mood,
      temp,
      battery,
      thought,
      serial,
      accessories,
      drawer,
      trackId,
      playing,
      chat,
      bond,
      wildBond,
      flickScore,
      pins,
      setMood,
      playTrack,
      say,
      boySay,
      bump,
      addScore,
      total,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore outside provider')
  return ctx
}


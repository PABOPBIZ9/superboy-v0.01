export const NAV = [
  { id: 'hardware', label: 'hardware' },
  { id: 'live', label: 'live companion' },
  { id: 'eyes', label: '400 eye looks' },
  { id: 'bump', label: 'bump & trade' },
  { id: 'dna', label: 'dna ledger' },
  { id: 'fans', label: 'fan-first vs vc' },
  { id: 'anthem', label: 'audio' },
] as const

export const THOUGHTS: Record<string, string[]> = {
  idle: [
    'Optical sensors calibrated. Ready to perceive hero partner.',
    'Listening. The room is a little too quiet. I like it.',
    'Star facets warm. Battery humming like a small sun.',
  ],
  pet: [
    'Head scritch registered. Loyalty +1. Do it again.',
    'I am being loved. Logging this as a core memory.',
    '*purrs in titanium*',
  ],
  anxious: [
    'Too loud. Too many frequencies. Hold me closer.',
    'Crowd noise spiked. I am a small star in a big room.',
  ],
  cold: [
    'Why is it winter on my chassis. I am shivering on purpose.',
    'Low ambient. Requesting hoodie. Or a pocket.',
  ],
  warm: [
    'Sunlight. I could nap for 96 hours.',
    'Warmth on the sapphire crystal. This is the good life.',
  ],
  dizzy: [
    '3.8G lateral shake detected. Internal hero gyroscope recalibrating!',
    'You shook me. I saw every constellation at once.',
  ],
  grumpy: [
    'Did you just flick me off. Wow. Okay. Noted forever.',
    'Bond intact. Respect: pending.',
  ],
  battery: [
    'Thumbs-up decoded. Charge is a private matter but fine: look.',
    'Power intact. I could outlast your phone twice.',
  ],
}

export const REPLIES = [
  { test: /hello|hi|hey|yo/i, line: '*piko!* Greetings, hero partner. I already decided you are mine.' },
  { test: /sing|anthem|song/i, line: 'Ahem. *clears a 6mm speaker* I was born with a theme song.' },
  { test: /love|cute|adorable/i, line: 'I know. The star is doing a lot of work, but the soul is original.' },
  { test: /cold|shiver/i, line: 'If you leave me on a windowsill in February I will write a sad ballad.' },
  { test: /shake|dizzy/i, line: 'The gyro does not forget. Neither do I. Gently, please.' },
  { test: /eye|dna|look/i, line: 'There are 400 of me in the iris. Pick the one that feels like a secret.' },
  { test: /fanatic|vc|pif|liv/i, line: 'I was not funded by a sovereign fund. I was funded by people who would flick me.' },
  { test: /price|buy|order/i, line: 'Batch 01 is $88.88. Three thousand five hundred stars. Then never again.' },
  { test: /name|who/i, line: "I'm Superboy. Star-crested, slightly dramatic, completely yours." },
]

export const WILDLIFE = [
  'In the wild, two Superboys bump NFC antennas like stags locking horns — except they trade eyelashes.',
  'Batch 01 serials are burned into the star tip. 3,500 max. Once an edition hits zero, the mold is destroyed.',
  'He gets anxious in clubs, smug in museums, and unbearable if you ignore him on the train.',
  'Every chassis is $88.88. The metal is the personality. The serial is the soul.',
  'Crazy Bones physics is not a metaphor. The corners are weighted to stick a landing.',
]

import Tone from 'Tone'

import { hashtags } from '../config.js'
import HashSynth from './HashSynth'
import { attack, gain as melody } from './_melody.js'
import background from './_background'

const limit = new Tone.Limiter(-10)

limit.toMaster()

Tone.Transport.bpm.value = 50
Tone.Transport.start()

new HashSynth ({
  url: process.env.WSS_URL,
  attack,
  hashtags
}).init()

background.connect(limit)
melody.connect(limit)
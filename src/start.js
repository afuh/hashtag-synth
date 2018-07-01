import Tone from 'Tone'

import { hashtags } from '../config.js'
import HashSynth from './HashSynth'

import { attack, gain as melody } from './_melody.js'
import background from './_background'

const limit = new Tone.Limiter(-10)

background.connect(limit)
melody.connect(limit)
limit.toMaster()

Tone.Transport.bpm.value = 50
Tone.Transport.start()

new HashSynth ({
  url: 'http://beathoven.axelfuhrmann.com',
  attack,
  hashtags
}).init()

import Tone from 'Tone'
import UnmuteButton from 'unmute'

import { hashtags } from '../config.js'
import HashSynth from './HashSynth'
import { attack, gain as melody } from './_melody.js'
import background from './_background'

const limit = new Tone.Limiter(-10)

limit.toMaster()

Tone.Transport.bpm.value = 50
Tone.Transport.start()

new HashSynth ({
  url: 'https://beathoven.axelfuhrmann.com',
  attack,
  hashtags
}).init()

UnmuteButton({
  mute: true
})
  .on('unmute', () => {
    background.connect(limit)
    melody.connect(limit)
  })
  .on('mute', () => {
    background.disconnect(limit)
    melody.disconnect(limit)
  })

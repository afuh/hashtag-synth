import Tone from 'Tone'

export const gain = new Tone.Volume(-5)
export const attack = new Tone.Synth({
  oscillator: { type: "sine" }
})

// Reverb
const rev = new Tone.Freeverb({
  roomSize: 0.96,
  dampening: 3000,
  wet: 0.6
})

const revPha = new Tone.Phaser({
  octaves: 1
})
const revGain = new Tone.Volume(-20)

attack.connect(rev)
rev.connect(revPha)
revPha.connect(revGain)
revGain.connect(gain)

// Fxs
const cho2 = new Tone.Chorus()
const FXsGain = new Tone.Volume(-15)
const del = new Tone.PingPongDelay({
  delayTime: "4n",
  maxDelayTime: 2,
  wet: 0.3
})

attack.connect(cho2)
cho2.connect(del)
del.connect(FXsGain)
FXsGain.connect(gain)

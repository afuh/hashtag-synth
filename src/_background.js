import Tone from 'Tone'

const envelope = {
  attack: 2,
  decay: 1,
  sustain: 0.7,
  release: 1
}

const bassLeft = new Tone.Synth({
  oscillator: { type: 'sine' },
  envelope
})

const bassRight = new Tone.Synth({
  oscillator: { type: 'sawtooth' },
  envelope
})

const middleLeft = new Tone.Synth({
  oscillator: { type: 'sawtooth' },
  envelope
})

const middleRigth = new Tone.Synth({
  oscillator: { type: 'sawtooth' },
  envelope
})

const highLeft = new Tone.Synth({
  oscillator: { type: 'sawtooth' },
  envelope
})

const highRight = new Tone.Synth({
  oscillator: { type: 'sawtooth' },
  envelope
})

new Tone.Sequence(((time, note) => {
  bassLeft.triggerAttackRelease(note, '1n', time)
}), ['C2', 'G#2', 'G2', 'F2', 'C2', 'G#2', 'G2', 'A#1'], '1n').start()

new Tone.Sequence(((time, note) => {
  bassRight.triggerAttackRelease(note, '1n', time)
}), ['C2', 'G#2', 'G2', 'F2', 'C2', 'G#2', 'G2', 'A#1'], '1n').start()

new Tone.Sequence(((time, note) => {
  middleLeft.triggerAttackRelease(note, '1n', time)
}), ['D#3', 'C3', 'A#3', 'A#3'], '1n').start()

new Tone.Sequence(((time, note) => {
  middleRigth.triggerAttackRelease(note, '1n', time)
}), ['G3', 'C3', 'A#3', 'A#3'], '1n').start()

new Tone.Sequence(((time, note) => {
  highLeft.triggerAttackRelease(note, '1n', time)
}), ['D#4', 'D#4', 'D#4', 'D#4', 'G4', 'G4', 'G4', "F4"], '1n').start()

new Tone.Sequence(((time, note) => {
  highRight.triggerAttackRelease(note, '1n', time)
}), ['D#4', 'D#4', ['D4', "D#4"], 'D4', 'D#4', 'C4', 'D#4', ["D#4", "D4"]], '1n').start()


const reverb = new Tone.Freeverb({
  roomSize: 0.7,
  dampening: 300
})

const left = new Tone.Panner(-0.5)
const right = new Tone.Panner(0.5)

const compre = new Tone.Compressor({
  threshold: -4
})

bassLeft.connect(left)
middleLeft.connect(left)
highLeft.connect(left)

middleRigth.connect(right)
highRight.connect(right)
bassRight.connect(right)

left.connect(reverb)
right.connect(reverb)

reverb.connect(compre)

const gain = new Tone.Volume(-28)

compre.connect(gain)

export default gain

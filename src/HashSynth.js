import io from 'socket.io-client'

export default class HashSynth {
  constructor({ url, hashtags, attack }){
    this.melo = attack
    this.socket = io.connect(url)
    this.dom = {
      tweet: document.querySelector(".tweet"),
      hash: document.querySelector(".hash"),
      users: document.querySelector(".user-list")
    }

    this.dom.hash.innerHTML = hashtags.map(name => "\n" + name ).join()

    this.note = {
      name: ['C', 'D#', 'F', 'G', 'G#', 'A#'],
      octave: ['4', '5']
    }

    window.addEventListener('keydown', e => e.keyCode === 32 && this.handleSound())
  }
  init(){
    this.socket.on('tweet', data => {
      // console.log(data.entities.hashtags.map(h => h.text))
      const note = this.handleSound()
      this.handleDom(data, note)
    })
  }
  handleSound(){
    const rArr = arr => arr[Math.floor(Math.random() * arr.length)]
    const note = rArr(this.note.name) + rArr(this.note.octave)

    this.melo.triggerAttackRelease(note, "16n")

    return note
  }
  handleDom(data, note){
    const imageURL = data.user.profile_image_url.replace(/^http:\/\//i, 'https://')

    this.dom.tweet.innerHTML = `<img class='image' src=${imageURL}> <span>${data.text}</span>`
    this.dom.users.insertAdjacentHTML("afterbegin", `
      <li>${note + `${note.length === 2 ? "  \xa0|" : " |"}`}
        ${data.user.name} ${data.user.location ? "- " + data.user.location : ''}
      </li>
    `)
  }
}

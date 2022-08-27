require('dotenv').config()

const Twitter = require('twitter-lite')
const { hashtags } = require('./config')

const PORT = process.env.PORT || 8085
const server = require('http').createServer()
const io = require('socket.io')(server)

server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`listening on port ${PORT}`)
})

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_KEY,
  access_token_secret: process.env.ACCESS_SECRET
})

const init = () => {
  client.stream('statuses/filter', { track: hashtags.join() })
    .on("start", () => console.log("start twitter stream"))
    .on("data", data => io.emit('tweet', data))
    .on("ping", () => console.log("ping"))
    .on("error", error => {
        console.log("error", error)
        client.stream.destroy()
        setTimeout(() => init(), 2000)
    })
    .on("end", () => console.log("end twitter stream"))
}

init()
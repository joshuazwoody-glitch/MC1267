const mineflayer = require('mineflayer')
const { mineflayer: viewer } = require('prismarine-viewer')
const express = require('express')
const app = express()

// Bind to port 10000 for Render.com
const PORT = process.env.PORT || 10000

app.get('/', (req, res) => res.send('Bot Status: Online!'))
app.listen(PORT, () => console.log(`Web portal active on port ${PORT}`))

const bot = mineflayer.createBot({
  host: 'top.pika.host', // A popular cracked server for testing
  username: 'RenderTester_99',
  auth: 'offline', 
  version: '1.20.1'
})

bot.once('spawn', () => {
  console.log('Bot joined the server!')
  // Viewer runs on the same port Render expects
  viewer(bot, { port: PORT, firstPerson: true })
})

bot.on('error', (err) => console.log('Error:', err.message))
bot.on('end', () => console.log('Disconnected. Restarting...'))

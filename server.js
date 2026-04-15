const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 10000
const PASS = "YourBotPass123"

app.get('/', (req, res) => res.send('Bot is active! Check Render logs for chat.'))
app.listen(PORT, () => console.log(`Web portal active on port ${PORT}`))

const bot = mineflayer.createBot({
  host: 'play.bluemc.fun', // Changed to a smaller server
  username: 'RenderBot_V1',
  auth: 'offline',
  version: '1.20.1'
})

// Auto-Login for cracked servers
bot.on('message', (jsonMsg) => {
  const msg = jsonMsg.toString()
  console.log(`[CHAT] ${msg}`) // See game chat in Render logs
  if (msg.includes('/register')) bot.chat(`/register ${PASS} ${PASS}`)
  if (msg.includes('/login')) bot.chat(`/login ${PASS}`)
})

bot.once('spawn', () => {
  console.log('✅ Bot successfully joined the world!')
  // No viewer here means no "Canvas" error!
})

bot.on('error', (err) => console.log('Error:', err.message))
bot.on('kicked', (reason) => console.log('Kicked for:', reason))

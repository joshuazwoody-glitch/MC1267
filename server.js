const mineflayer = require('mineflayer')
const { mineflayer: viewer } = require('prismarine-viewer')
const express = require('express')
const app = express()

// 1. SETTINGS & PORT BINDING
const PORT = process.env.PORT || 10000
const BOT_PASSWORD = "YourSecurePassword123" // Change this!

app.get('/', (req, res) => res.send('Bot is active! Visit /view to see it.'))
app.listen(PORT, () => console.log(`Web server on port ${PORT}`))

// 2. CREATE THE BOT (OFFLINE MODE)
const bot = mineflayer.createBot({
  host: 'top.pika.host', // Test on a cracked server
  username: 'RenderBot_V1',
  auth: 'offline',        // No Microsoft login required
  version: '1.20.1'       // Set version explicitly for stability
})

// 3. AUTO-LOGIN / REGISTER LOGIC
// Cracked servers usually ask for /register or /login in chat
bot.on('message', (jsonMsg) => {
  const message = jsonMsg.toString()
  console.log(`[CHAT]: ${message}`)

  if (message.includes('/register')) {
    bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`)
  } else if (message.includes('/login')) {
    bot.chat(`/login ${BOT_PASSWORD}`)
  }
})

// 4. 3D VIEWER (RENDER.COM COMPATIBLE)
bot.once('spawn', () => {
  console.log('Bot has spawned in the world!')
  
  // Launch viewer on the same port Render monitors
  try {
    viewer(bot, { port: PORT, firstPerson: true })
    console.log(`Viewer active at Render URL`)
  } catch (err) {
    console.log('Viewer failed (likely canvas error). Bot still running.')
  }
})

// 5. ERROR HANDLING
bot.on('error', (err) => console.log(`CRITICAL ERROR: ${err.message}`))
bot.on('kicked', (reason) => console.log(`KICKED: ${reason}`))
bot.on('end', () => console.log('Bot disconnected. Render will restart it automatically.'))

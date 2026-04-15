const mineflayer = require('mineflayer')
const inventoryViewer = require('mineflayer-web-inventory')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 10000
const PASS = "StrongPass123!" // Password for cracked servers

// Web Status Page
app.get('/', (req, res) => res.send('Bot is active! Inventory at /inventory'))
app.listen(PORT, () => console.log(`Dashboard active on port ${PORT}`))

const bot = mineflayer.createBot({
  host: 'top.pika.host', 
  username: 'RenderBot_V1',
  auth: 'offline',
  version: '1.20.1'
})

// Web Inventory Dashboard
inventoryViewer(bot, { port: PORT, startOnLoad: true })

// Auto-Login for Cracked Servers
bot.on('message', (jsonMsg) => {
  const msg = jsonMsg.toString()
  if (msg.includes('/register')) bot.chat(`/register ${PASS} ${PASS}`)
  if (msg.includes('/login')) bot.chat(`/login ${PASS}`)
})

bot.on('spawn', () => console.log('Bot is online and inventory is ready!'))
bot.on('error', (err) => console.log('Error:', err.message))

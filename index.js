const express = require('express')
const app = express()
const cors = require('cors')
// const z = require('zod')
const games = require('./games/games.json')

const PORT = process.env.PORT ?? 53400

// Middleware
app.use(cors())
app.use(express.json())

app.get('/games', (req, res) => {
  res.json(games)
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

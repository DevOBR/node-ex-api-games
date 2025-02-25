const crypto = require('node:crypto')
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
  res.json({ games, totalCount: games.length })
})

app.get('/games/:id', (req, res) => {
  const { id } = req.params
  const game = games.find((game) => game.id === id)
  if (!game) res.status(404).json({ message: 'Game not found' })

  res.json(game)
})

app.post('/games', (req, res) => {
  if (!req.body) res.status(400).json({ message: 'Body is required' })
  const { name, img, year, rate } = req.body
  const newGame = {
    name,
    img,
    year,
    rate
  }

  games.push({
    id: crypto.randomUUID(),
    newGame
  })

  res.status(201).json(newGame)
})

app.delete('/games/:id', (req, res) => {
  const { id } = req.params
  const gameIndex = games.findIndex((game) => game.id === id)
  if (gameIndex === -1) res.status(404).json({ message: 'Game not found' })

  games.splice(gameIndex, 1)
  res.json({ games, totalCount: games.length })
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

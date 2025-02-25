const crypto = require('node:crypto')
const express = require('express')
const app = express()
// const cors = require('cors')
// const z = require('zod')
const games = require('./games/games.json')

const PORT = process.env.PORT ?? 53400

app.disable('x-powered-by')

// Middleware
// app.use(cors())
app.use(express.json())

app.get('/games', (req, res) => {
  return res.json({ games, totalCount: games.length })
})

app.get('/games/:id', (req, res) => {
  const { id } = req.params
  const gameIndex = games.findIndex((game) => game.id === id)
  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Game not found' })
  }

  return res.json(games[gameIndex])
})

app.post('/games', (req, res) => {
  const { name, img, year, rate } = req.body
  const exist = games.some((game) => {
    return game.name.toLowerCase() === name.toLowerCase()
  })

  if (exist) return res.status(500).json({ message: 'Game already exists' })
  if (!req.body) return res.status(400).json({ message: 'Body is required' })
  const newGame = {
    name,
    img,
    year,
    rate
  }

  games.push({
    id: crypto.randomUUID(),
    ...newGame
  })

  return res.status(201).json(newGame)
})

app.put('/games/:id', (req, res) => {
  const { id } = req.params
  const { name, img, year, rate } = req.body
  const gameIndex = games.findIndex((game) => game.id === id)
  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Game not found' })
  }

  games[gameIndex] = {
    ...games[gameIndex],
    ...{ name, img, year, rate }
  }

  return res.json(games[gameIndex])
})

app.delete('/games/:id', (req, res) => {
  const { id } = req.params
  const gameIndex = games.findIndex((game) => game.id === id)
  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Game not found' })
  }

  games.splice(gameIndex, 1)
  return res.json({ games, totalCount: games.length })
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

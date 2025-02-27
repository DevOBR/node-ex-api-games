const crypto = require('node:crypto')
const express = require('express')
const app = express()
const games = require('./games/games.json')
const { validateNewGame, validatePartialGame } = require('./validations/games')
const cors = require('cors')

const PORT = process.env.PORT ?? 53400

app.disable('x-powered-by')

// Middlewares
app.use(cors())
app.use(express.json())

// API Methods
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
  const result = validateNewGame(req.body)

  if (!result.success) {
    return res.status(400).json({ message: result.error.errors })
  }
  const exist = games.some((game) => {
    return game.name.toLowerCase() === result.data.name.toLowerCase()
  })

  if (exist) return res.status(500).json({ message: 'Game already exists' })

  const newGame = {
    id: crypto.randomUUID(),
    ...result.data
  }

  games.push(newGame)

  return res.status(201).json(newGame)
})

app.put('/games/:id', (req, res) => {
  const { id } = req.params

  const gameIndex = games.findIndex((game) => game.id === id)

  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Game not found' })
  }

  const result = validateNewGame(req.body)

  if (!result.success) {
    return res.status(400).json({ message: result.error.errors })
  }

  games[gameIndex] = {
    ...games[gameIndex],
    ...result.data
  }

  return res.json(games[gameIndex])
})

app.patch('/games/:id', (req, res) => {
  const { id } = req.params

  const gameIndex = games.findIndex((game) => game.id === id)

  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Game not found' })
  }

  const result = validatePartialGame(req.body)

  if (!result.success) {
    return res.status(400).json({ message: result.error.errors })
  }

  games[gameIndex] = {
    ...games[gameIndex],
    ...result.data
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

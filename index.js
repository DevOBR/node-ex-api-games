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

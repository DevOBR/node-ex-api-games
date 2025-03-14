import { Router } from 'express'
import { readJSON } from '../utils.js'
import { validateNewGame, validatePartialGame } from '../validations/games.js'
import { randomUUID } from 'node:crypto'

const games = readJSON('./games/games.json')
export const gamesRouter = Router()

gamesRouter.get('/', (req, res) => {
  return res.json({ games, totalCount: games?.length })
})

gamesRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const gameIndex = games?.findIndex((game) => game.id === id)
  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Game not found' })
  }

  return res.json(games[gameIndex])
})

gamesRouter.post('/', (req, res) => {
  const result = validateNewGame(req.body)

  if (!result.success) {
    return res.status(400).json({ message: result.error.errors })
  }
  const exist = games?.some((game) => {
    return game.name.toLowerCase() === result.data.name.toLowerCase()
  })

  if (exist) return res.status(500).json({ message: 'Game already exists' })

  const newGame = {
    id: randomUUID(),
    ...result.data
  }

  games?.push(newGame)

  return res.status(201).json(newGame)
})

gamesRouter.put('/:id', (req, res) => {
  const { id } = req.params

  const gameIndex = games?.findIndex((game) => game.id === id)

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

gamesRouter.patch('/:id', (req, res) => {
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

gamesRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const gameIndex = games?.findIndex((game) => game.id === id)
  if (gameIndex === -1) {
    return res.status(404).json({ message: 'Game not found' })
  }

  games?.splice(gameIndex, 1)
  return res.json({ games, totalCount: games?.length })
})

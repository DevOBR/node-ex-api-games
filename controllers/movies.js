import { GameModel } from '../models/game.js'
import { validateNewGame, validatePartialGame } from '../validations/games.js'

export class MovieController {
  static async getAll(req, res) {
    const { category } = req.query
    const gamesResult = await GameModel.getAll({ category })
    return res.json({ gamesResult, totalCount: gamesResult?.length })
  }

  static async getById(req, res) {
    const { id } = req.params
    const gameResult = await GameModel.getById({ id })
    return res.json(gameResult)
  }

  static async create(req, res) {
    const result = validateNewGame(req.body)

    if (!result.success) {
      return res.status(400).json({ message: result.error.errors })
    }

    const newGame = await GameModel.create({ input: result.data })

    if (!newGame) {
      return res.status(500).json({ message: 'Error creating New Game' })
    }

    return res.status(201).json(newGame)
  }

  static async update(req, res) {
    const { id } = req.params

    const result = validateNewGame(req.body)

    if (!result.success) {
      return res.status(400).json({ message: result.error.errors })
    }

    const updatedGame = await GameModel.update({ id, input: result.data })

    if (!updatedGame) {
      return res.status(500).json({ message: 'Error updating game' })
    }

    return res.json(updatedGame)
  }

  static async patch(req, res) {
    const { id } = req.params

    const result = validatePartialGame(req.body)

    if (!result.success) {
      return res.status(400).json({ message: result.error.errors })
    }

    const updatedGame = await GameModel.patch({ id, input: result.data })

    if (!updatedGame) {
      return res.status(500).json({ message: 'Error updating game' })
    }

    return res.json(updatedGame)
  }

  static async delete(req, res) {
    const { id } = req.params

    const result = await GameModel.delete({ id })

    if (!result) return res.status(500).json({ message: 'Error deleting game' })

    return res.json({ message: 'Game deleted' })
  }
}

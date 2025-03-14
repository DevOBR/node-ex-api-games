import { readJSON } from '../utils.js'
import { randomUUID } from 'node:crypto'

const games = readJSON('./games/games.json')

export class GameModel {
  static async getAll({ category }) {
    if (category) {
      return games?.filter((game) => game.category === category)
    }

    return games
  }

  static async getById({ id }) {
    return games?.find((game) => game.id === id)
  }

  static async create({ input }) {
    const exist = games?.some((game) => {
      return game.name.toLowerCase() === input.name.toLowerCase()
    })

    if (exist) return null

    const newGame = {
      id: randomUUID(),
      ...input
    }

    games?.push(newGame)

    return newGame
  }

  static async update({ id, input }) {
    const gameIndex = games?.findIndex((game) => game.id === id)

    if (gameIndex === -1) return null

    games[gameIndex] = {
      ...games[gameIndex],
      ...input
    }

    return games[gameIndex]
  }

  static async patch({ id, input }) {
    const gameIndex = games?.findIndex((game) => game.id === id)

    if (gameIndex === -1) return null

    games[gameIndex] = {
      ...games[gameIndex],
      ...input
    }

    return games[gameIndex]
  }

  static async delete({ id }) {
    const gameIndex = games?.findIndex((game) => game.id === id)

    if (gameIndex === -1) {
      return false
    }

    games?.splice(gameIndex, 1)

    return true
  }
}

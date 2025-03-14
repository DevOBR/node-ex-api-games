import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const gamesRouter = Router()

gamesRouter.get('/', MovieController.getAll)
gamesRouter.get('/:id', MovieController.getById)
gamesRouter.post('/', MovieController.create)
gamesRouter.put('/:id', MovieController.update)
gamesRouter.patch('/:id', MovieController.patch)
gamesRouter.delete('/:id', MovieController.delete)

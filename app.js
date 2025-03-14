import express, { json } from 'express'
import { gamesRouter } from './routes/games.js'
import { corsMiddleware } from './middlewares/cors.js'

// import games from './games/games.json'

// import fs from 'node:fs'
// const games = JSON.parse(fs.readFileSync('./games/games.json', 'utf-8'))

// Native way to read JSON in ESModules

const app = express()
const PORT = process.env.PORT ?? 53400

app.disable('x-powered-by')

// Middlewares
app.use(corsMiddleware())
app.use(json())

// API Methods
app.use('/games', gamesRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

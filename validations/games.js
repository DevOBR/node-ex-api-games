const z = require('zod')

function validateGame() {
  const game = z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    }),
    img: z.string().url().optional(),
    year: z
      .number({
        invalid_type_error: 'Year must be a number',
        required_error: 'Year is required'
      })
      .int(),
    rate: z.number().min(0).max(10).default(5)
  })

  return game
}

function validateNewGame(input) {
  return validateGame().safeParse(input)
}

module.exports = {
  validateNewGame
}

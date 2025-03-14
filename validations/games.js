import z from 'zod'

function validateGame() {
  const game = z.object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string'
    }),
    img: z
      .string()
      .url({
        message: 'Image must be a valid URL'
      })
      .optional(),
    year: z
      .number({
        invalid_type_error: 'Year must be a number',
        required_error: 'Year is required'
      })
      .int()
      .min(1900)
      .max(2025),
    rate: z.number().min(0).max(10).default(5)
  })

  return game
}

export function validateNewGame(input) {
  return validateGame().safeParse(input)
}

export function validatePartialGame(input) {
  return validateGame().partial().safeParse(input)
}

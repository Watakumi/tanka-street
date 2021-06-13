import { z } from "zod"

const firstLine = z.string().min(3).max(7)
const secondLine = z.string().min(5).max(9)
const thirdLine = z.string().min(3).max(7)
const fourthLine = z.string().min(5).max(9)
const fifthLine = z.string().min(5).max(9)
const userId = z.number()

export const ValidateTanka = z.object({
  firstLine,
  secondLine,
  thirdLine,
  fourthLine,
  fifthLine,
  userId,
})

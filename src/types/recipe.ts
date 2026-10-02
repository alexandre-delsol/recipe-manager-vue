import type { Ingredient } from './ingredient'

export type Recipe = {
  id: string
  name: string
  category: string
  area: string
  thumbnail: string
  instructions: string
  youtube: string | null
  ingredients: Ingredient[]
}
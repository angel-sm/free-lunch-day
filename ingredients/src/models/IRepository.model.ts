import { Ingredient } from './Ingredient.model'

export interface IRepository {
  getIngredients(): Promise<Ingredient[]>
  getEmptyIngredients(ingredients: Array<string>): Promise<Ingredient[]>
  updateIngredientExistence(
    ingredient: string,
    existence: number,
  ): Promise<void>
}

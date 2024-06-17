import { Recipe } from './Recipe.model'

export interface IRepository {
  getRecipes(): Promise<Recipe[]>
}

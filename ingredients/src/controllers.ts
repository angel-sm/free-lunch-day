// src/controllers/RecipeController.ts
import { Request, Response } from 'express'
import { RetrieveIngredients } from './use-cases/retrieve-ingredients.uc'

export class Controller {
  constructor(private retrieveIngredients: RetrieveIngredients) {}

  async retrieveRecipesHandler(req: Request, response: Response) {
    await this.retrieveIngredients.run(response)
  }
}

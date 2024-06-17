// src/controllers/RecipeController.ts
import { Request, Response } from 'express'
import { PreprareRecipe } from './use-cases/prepare-recipe.uc'
import { RetriveRecipes } from './use-cases/retireve-recipes.uc'

export class Controller {
  constructor(
    private preprareRecipeUseCase: PreprareRecipe,
    private retireveReciepesUseCase: RetriveRecipes,
  ) {}

  async prepareRecipeHandler(request: Request, response: Response) {
    await this.preprareRecipeUseCase.run(response)
  }

  async retrieveRecipesHandler(req: Request, response: Response) {
    await this.retireveReciepesUseCase.run(response)
  }
}

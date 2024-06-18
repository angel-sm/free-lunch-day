// src/controllers/RecipeController.ts
import { Request, Response } from 'express'
import { PreprareRecipe } from './use-cases/prepare-recipe'
import { RetriveRecipes } from './use-cases/retrieve-recipes'
import { SQSQueues } from './server'

export class Controller {
  constructor(
    private preprareRecipeUseCase: PreprareRecipe,
    private retireveReciepesUseCase: RetriveRecipes,
    private sqs: SQSQueues,
  ) {}

  async prepareRecipeHandler(request: Request, response: Response) {
    const recipe = await this.preprareRecipeUseCase.run({
      finishOrderQueue: this.sqs.finishOrderQueue,
      recipesQueue: this.sqs.recipesQueue,
      registryOrderQueue: this.sqs.registryOrderQueue,
      ingredientsQueue: this.sqs.ingredientsQueue,
    })

    response.status(200).json(recipe)
  }

  async retrieveRecipesHandler(req: Request, response: Response) {
    await this.retireveReciepesUseCase.run(response)
  }
}

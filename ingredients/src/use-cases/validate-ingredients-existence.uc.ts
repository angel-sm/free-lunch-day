import { IRecipe } from '../interfaces/IRecipes'
import { IRepository } from '../models/IRepository.model'
import { Ingredient } from '../models/Ingredient.model'
import { SQS } from '../utils/sqs.services'

interface IngredinteMap {
  [ingredient: string]: Ingredient
}

export class ValidateIngredientsExistence {
  constructor(
    private repository: IRepository,
    private ingredientsQueue: SQS,
    private ingredientsResponseQueue: SQS,
    private purchaseQueue: SQS,
  ) {}

  async run() {
    try {
      console.log('Validando ingredientes')

      this.ingredientsQueue.consumeMessage(async (recipe: IRecipe) => {
        const recipeIngredients: IngredinteMap = {}

        recipe.ingredients.forEach(({ id, ingredient, quantity }) => {
          recipeIngredients[ingredient] = new Ingredient(
            id,
            ingredient,
            quantity,
          )
        })

        const storedIngredients = await this.repository.getEmptyIngredients(
          Object.keys(recipeIngredients),
        )

        for (const ingredient of storedIngredients) {
          try {
            const ingredientName = ingredient.getIngredient()
            const recipeIngredientRequirement =
              recipeIngredients[ingredientName].getExistence()

            while (recipeIngredientRequirement > ingredient.getExistence()) {
              await ingredient.buy(this.purchaseQueue)
              console.log('Comprando ingredientes')
            }

            ingredient.spend(recipeIngredientRequirement)

            await this.repository.updateIngredientExistence(
              ingredient.getId(),
              ingredient.getExistence(),
            )

            console.log('Ingrediente listo')
          } catch (error) {
            console.log('🚀 ~ Error ~ error:', error)
          }
        }

        console.log('Enviando ingrediente')
        this.ingredientsResponseQueue.sendMessage(
          JSON.stringify(recipeIngredients),
        )
      })
    } catch (error) {
      console.log('🚀 ~ ValidateIngredientsExistence ~ run ~ error:', error)
    }
  }
}

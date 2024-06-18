import { IRecipe } from '../interfaces/IRecipes'
import { IRepository } from '../models/IRepository.model'
import { Ingredient } from '../models/Ingredient.model'
import { SQS } from '../utils/sqs.services'

interface Message {
  recipe: IRecipe
  order: string
}

interface IngredinteMap {
  [ingredient: string]: Ingredient
}

interface RunArgs {
  recipesQueue: SQS
  ingredientsQueue: SQS
  purchaseQueue: SQS
}

export class ValidateIngredientsExistence {
  constructor(private repository: IRepository) {}

  async run({ recipesQueue, ingredientsQueue, purchaseQueue }: RunArgs) {
    try {
      console.log('Validando ingredientes')

      await recipesQueue.receiveMessages(async (message: Message) => {
        try {
          console.log(`${new Date().toISOString()} - Ingredients request`)

          const recipeIngredients: IngredinteMap = {}
          message.recipe.ingredients.forEach(({ id, ingredient, quantity }) => {
            recipeIngredients[ingredient] = new Ingredient(
              id,
              ingredient,
              quantity,
            )
          })

          const storedIngredients = await this.repository.getEmptyIngredients(
            Object.keys(recipeIngredients),
          )

          new Promise(async resolve => {
            for (const ingredient of storedIngredients) {
              const ingredientName = ingredient.getIngredient()
              const recipeIngredientRequirement =
                recipeIngredients[ingredientName].getExistence()

              while (recipeIngredientRequirement > ingredient.getExistence()) {
                await ingredient.buy(purchaseQueue)
                console.log(
                  'Comprando ingredientes',
                  ingredient.getIngredient(),
                )
              }

              ingredient.spend(recipeIngredientRequirement)

              await this.repository.updateIngredientExistence(
                ingredient.getId(),
                ingredient.getExistence(),
              )
            }
            resolve(true)
          }).then(async () => {
            console.log('Ingrediente listo')
            await ingredientsQueue.publishMessage(
              JSON.stringify(recipeIngredients),
            )
          })
        } catch (error) {
          console.log('🚀 ~ ~ error:', error)
        }
      })
    } catch (error) {
      console.log('🚀 ~ ValidateIngredientsExistence ~ run ~ error:', error)
    }
  }
}

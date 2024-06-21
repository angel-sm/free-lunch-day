import { IRepository } from '../models/IRepository.model'
import { SQS } from '../utils/sqs.services'
import { v4 } from 'uuid'

interface RunArgs {
  recipesQueue: SQS
  finishOrderQueue: SQS
  registryOrderQueue: SQS
  ingredientsQueue: SQS
}

export class PreprareRecipe {
  constructor(private repository: IRepository) {}

  async run({
    recipesQueue,
    finishOrderQueue,
    registryOrderQueue,
    ingredientsQueue,
  }: RunArgs) {
    try {
      const recipes = await this.repository.getRecipes()
      const number = Math.floor(Math.random() * recipes.length)
      const recipe = recipes[number]

      const order = v4()

      await recipesQueue.publishMessage(
        JSON.stringify({
          recipe,
          order,
        }),
      )

      await registryOrderQueue.receiveMessages(async (message: any) => {
        console.log('Order registered')
      })

      return new Promise(async resolve => {
        await ingredientsQueue.receiveMessages(async (message: any) => {
          finishOrderQueue.publishMessage(
            JSON.stringify({
              order,
            }),
          )
          console.log('Ingredientes recividos')
          resolve(recipe)
        })
      })
    } catch (error) {
      return 'error'
    }
  }
}

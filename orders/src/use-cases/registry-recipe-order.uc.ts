import { IRecipe } from '../interfaces/IRecipes'
import { IRepository } from '../models/IRepository.model'
import { Order } from '../models/Order.model'
import { SQS } from '../utils/sqs.services'

export class RegistryRecipeOrder {
  registryOrderQueue: SQS
  registryResponseOrderQueue: SQS

  constructor(private repository: IRepository) {
    this.registryOrderQueue = new SQS('registry_order_queue')
    this.registryResponseOrderQueue = new SQS('registry_response_order_queue')
  }

  async run() {
    try {
      await this.registryOrderQueue.connect()
      await this.registryResponseOrderQueue.connect()

      this.registryOrderQueue.consumeMessage(async (recipeMessage: any) => {
        const recipe = recipeMessage as IRecipe

        const order = new Order('progress', recipe.id)

        await this.repository.storeOrder(order)

        await this.registryResponseOrderQueue.sendMessage(JSON.stringify(order))
      })
    } catch (error) {
      console.error('🚀 ~ RegistryRecipeOrder ~ run ~ error:', error)
    }
  }
}

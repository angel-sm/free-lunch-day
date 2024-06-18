import { IRecipe } from '../interfaces/IRecipes'
import { IRepository } from '../models/IRepository.model'
import { Order } from '../models/Order.model'
import { SQS } from '../utils/sqs.services'

interface Message {
  recipe: IRecipe
  order: string
}

interface RunArgs {
  recipesQueue: SQS
  registryResponseOrderQueue: SQS
}

export class RegistryRecipeOrder {
  constructor(private repository: IRepository) {}

  async run({ recipesQueue, registryResponseOrderQueue }: RunArgs) {
    console.log('New order recibed')

    await recipesQueue.receiveMessages(async (message: Message) => {
      try {
        console.log(`${new Date().toISOString()} - New order`)

        const order = new Order(message.order, 'progress', message.recipe.id)
        await this.repository.storeOrder(order)

        await registryResponseOrderQueue.publishMessage(JSON.stringify(order))
      } catch (error) {
        console.log('🚀 ~ ~ error:', error)
      }
    })
  }
}

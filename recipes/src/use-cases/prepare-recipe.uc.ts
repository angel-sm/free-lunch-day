import { Response } from 'express'
import { IRepository } from '../models/IRepository.model'
import { SQS } from '../utils/sqs.services'
import { IOrder } from '../interfaces/IOrder'

export class PreprareRecipe {
  registryOrderQueue: SQS
  registryResponseOrderQueue: SQS
  ingredientsQueue: SQS
  ingredientsResponseQueue: SQS
  finishOrderQueue: SQS

  constructor(private repository: IRepository) {
    this.registryOrderQueue = new SQS('registry_order_queue')
    this.registryResponseOrderQueue = new SQS('registry_response_order_queue')
    this.ingredientsQueue = new SQS('ingredients_queue')
    this.ingredientsResponseQueue = new SQS('ingredients_response_queue')
    this.finishOrderQueue = new SQS('finish_order_queue')
  }

  async run(response: Response) {
    await this.ingredientsQueue.connect()
    await this.ingredientsResponseQueue.connect()
    await this.registryOrderQueue.connect()
    await this.registryResponseOrderQueue.connect()
    await this.finishOrderQueue.connect()

    const recipes = await this.repository.getRecipes()
    const number = Math.floor(Math.random() * recipes.length)

    const recipe = recipes[number]
    try {
      this.registryOrderQueue.sendMessage(JSON.stringify(recipe))
      this.ingredientsQueue.sendMessage(JSON.stringify(recipe.ToPrimitive()))

      this.registryResponseOrderQueue.consumeMessage(
        async (order: IOrder) => {},
      )

      this.ingredientsResponseQueue.consumeMessage((_: any) => {})

      // this.finishOrderQueue.sendMessage(
      //   JSON.stringify({
      //     id: order.id,
      //   }),
      // )

      response.status(200).json(recipe)
    } catch (error) {
      response.status(500).send(error)
    }
  }
}

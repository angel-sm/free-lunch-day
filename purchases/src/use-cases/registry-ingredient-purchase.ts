import * as amqplib from 'amqplib'
import { IIngredient } from '../interfaces/IIngredient'
import { IRepository } from '../models/IRepository.model'
import { Purchase } from '../models/Purchase.model'
import { SQS } from '../utils/sqs.services'

interface RunArgs {
  purchaseQueue: SQS
}

export class RegistryIngredientPurchase {
  constructor(private repository: IRepository) {}

  async run({ purchaseQueue }: RunArgs) {
    await purchaseQueue.receiveMessages(
      async (ingredient: IIngredient, channel: amqplib.Channel) => {
        console.log(`${new Date().toISOString()} - New Purchase`)
        const purchase = new Purchase(
          ingredient.ingredient,
          ingredient.quantity,
        )
        await this.repository.storePurchase(purchase)
      },
    )
  }
}

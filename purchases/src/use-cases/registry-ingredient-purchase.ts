import { IIngredient } from '../interfaces/IIngredient'
import { IRepository } from '../models/IRepository.model'
import { Purchase } from '../models/Purchase.model'
import { SQS } from '../utils/sqs.services'

export class RegistryIngredientPurchase {
  purchaseQueue: SQS

  constructor(private repository: IRepository) {
    this.purchaseQueue = new SQS('purchases_queue')
  }

  async run() {
    await this.purchaseQueue.connect()
    this.purchaseQueue.consumeMessage(async (ingredient: IIngredient) => {
      const purchase = new Purchase(ingredient.ingredient, ingredient.quantity)
      await this.repository.storePurchase(purchase)

      console.log('Purchase stored')
    })
  }
}

import { IRepository } from '../models/IRepository.model'
import { SQS } from '../utils/sqs.services'

interface OrderId {
  id: string
}

export class FinishRecipeOrder {
  constructor(private repository: IRepository) {}

  async run() {
    // const order =
    //   (await this.finishOrderQueue.consumeMessage()) as unknown as OrderId
    // await this.repository.updateStatusOrder(order.id, 'finish')
  }
}

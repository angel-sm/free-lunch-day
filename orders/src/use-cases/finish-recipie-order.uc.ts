import { IRepository } from '../models/IRepository.model'
import { SQS } from '../utils/sqs.services'

interface RunArgs {
  finishOrderQueue: SQS
}

interface Message {
  order: string
}

export class FinishRecipeOrder {
  constructor(private repository: IRepository) {}

  async run({ finishOrderQueue }: RunArgs) {
    finishOrderQueue.receiveMessages(async (message: Message) => {
      await this.repository.updateStatusOrder(message.order, 'finish')
      console.log(
        `${new Date().toISOString()} - Order finished: ${message.order}`,
      )
    })
  }
}

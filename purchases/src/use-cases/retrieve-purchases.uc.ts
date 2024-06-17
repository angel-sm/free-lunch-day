import { Response } from 'express'
import { IRepository } from '../models/IRepository.model'

export class RetirevePurchases {
  constructor(private repository: IRepository) {}

  async run(response: Response) {
    try {
      const orders = await this.repository.getPurchases()
      response.status(200).send(orders)
      return
    } catch (error) {
      console.log('🚀 ~ ValidateIngredientsExistence ~ run ~ error:', error)
      response.status(400).send('Error')
    }
  }
}

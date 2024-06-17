// src/controllers/RecipeController.ts
import { Request, Response } from 'express'
import { RetrieveOrders } from './use-cases/retrieve-orders.uc'

export class Controller {
  constructor(private retrieveOrders: RetrieveOrders) {}

  async retrieveOrdersHandler(req: Request, response: Response) {
    await this.retrieveOrders.run(response)
  }
}

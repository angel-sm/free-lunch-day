// src/controllers/RecipeController.ts
import { Request, Response } from 'express'
import { RetirevePurchases } from './use-cases/retrieve-purchases.uc'

export class Controller {
  constructor(private retrievePurchases: RetirevePurchases) {}

  async retrievePurchasesHandler(req: Request, response: Response) {
    await this.retrievePurchases.run(response)
  }
}

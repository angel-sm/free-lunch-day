import { Response } from 'express'
import { IRepository } from '../models/IRepository.model'

export class RetriveRecipes {
  constructor(private repository: IRepository) {}

  async run(response: Response) {
    try {
      const recipes = await this.repository.getRecipes()
      response.status(200).send(recipes)
    } catch (error) {}
  }
}

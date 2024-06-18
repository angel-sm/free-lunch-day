import { IRepository } from '../models/IRepository.model'
import { Response } from 'express'

export class RetriveRecipes {
  constructor(private repository: IRepository) {}

  async run(response: Response) {
    try {
      const recipes = await this.repository.getRecipes()
      response.status(200).send(recipes)
    } catch (error) {
      response.status(500).send(error)
    }
  }
}

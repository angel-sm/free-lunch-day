import { Response } from 'express'
import { IRepository } from '../models/IRepository.model'

export class RetrieveIngredients {
  constructor(private repository: IRepository) {}

  async run(response: Response) {
    try {
      const ingredients = await this.repository.getIngredients()
      response.status(200).send(ingredients)
      return
    } catch (error) {
      console.log('🚀 ~ ValidateIngredientsExistence ~ run ~ error:', error)
      response.status(400).send('Error')
    }
  }
}

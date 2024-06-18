import { SQS } from '../utils/sqs.services'
import axios from 'axios'

export class Ingredient {
  constructor(
    private id: string,
    private ingredient: string,
    private existence: number,
  ) {}

  ToPrimitive() {
    return {
      id: this.id,
      ingredient: this.ingredient,
      existence: this.existence,
    }
  }

  getIngredient() {
    return this.ingredient
  }

  getExistence() {
    return this.existence
  }

  getId() {
    return this.id
  }

  async buy(sqs: SQS) {
    const {
      data: { quantitySold },
    } = await axios.get(
      `https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${this.ingredient}`,
    )

    if (quantitySold > 0) {
      sqs.publishMessage(
        JSON.stringify({
          ingredient: this.ingredient,
          createdAt: new Date(),
          quantity: quantitySold,
        }),
      )
      this.existence = this.existence + quantitySold
    }
  }

  async spend(recipeRequired: number) {
    this.existence = this.existence - recipeRequired
  }
}

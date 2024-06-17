import { IRepository } from '../models/IRepository.model'
import { PrismaClient } from '@prisma/client'
import { Ingredient } from '../models/Ingredient.model'

export class Repository implements IRepository {
  private prisma = new PrismaClient()

  async getIngredients(): Promise<Ingredient[]> {
    const documents = await this.prisma.ingredients.findMany({})
    const ingredientsMapped = documents.map(
      (doc: any) => new Ingredient(doc.id, doc.ingredient, doc.existence),
    )
    return ingredientsMapped
  }

  async getEmptyIngredients(ingredients: Array<string>): Promise<Ingredient[]> {
    const documents = await this.prisma.ingredients.findMany({
      where: {
        ingredient: {
          in: ingredients,
        },
      },
    })
    const ingredientsMapped = documents.map(
      (doc: any) => new Ingredient(doc.id, doc.ingredient, doc.existence),
    )
    return ingredientsMapped
  }

  async updateIngredientExistence(
    id: string,
    existence: number,
  ): Promise<void> {
    await this.prisma.ingredients.update({
      where: {
        id,
      },
      data: {
        existence,
      },
    })
  }
}

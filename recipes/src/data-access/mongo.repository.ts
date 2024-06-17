import { IRepository } from '../models/IRepository.model'
import { Recipe } from '../models/Recipe.model'
import { PrismaClient } from '@prisma/client'

export class Repository implements IRepository {
  private prisma = new PrismaClient()

  async getRecipes(): Promise<Recipe[]> {
    const documents = await this.prisma.recipes.findMany()
    const recipes = documents.map(
      (recipes: any) =>
        new Recipe(
          recipes.id,
          recipes.title,
          recipes.description,
          recipes.ingredients,
          recipes.instructions,
          recipes.cover,
          recipes.createdAt,
          recipes.updatedAt,
        ),
    )
    return recipes
  }
}

import { IRepository } from '../models/IRepository.model'
import { PrismaClient } from '@prisma/client'
import { Order } from '../models/Order.model'

interface RecipeMap {
  [id: string]: string
}

export class Repository implements IRepository {
  private prisma = new PrismaClient()

  async getOrders(): Promise<Order[]> {
    const documents = await this.prisma.orders.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    const recipeMap = {} as RecipeMap
    const recipes = await this.prisma.recipes.findMany({})

    recipes.forEach(recipe => {
      recipeMap[recipe.id] = recipe.title
    })

    const ordersMapped = documents.map(
      (doc: any) =>
        new Order(doc.id, doc.status, recipeMap[doc.recipe], doc.createdAt),
    )

    return ordersMapped
  }

  async storeOrder(order: Order): Promise<void> {
    const { id, recipe, status, updatedAt, createdAt } = order.ToPrimitive()
    await this.prisma.orders.create({
      data: {
        id,
        recipe,
        status,
        createdAt,
        updatedAt,
      },
    })
  }

  async updateStatusOrder(id: string, status: string): Promise<void> {
    await this.prisma.orders.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })
  }
}

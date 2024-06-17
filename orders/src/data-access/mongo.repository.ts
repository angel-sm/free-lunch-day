import { IRepository } from '../models/IRepository.model'
import { PrismaClient } from '@prisma/client'
import { Order } from '../models/Order.model'

export class Repository implements IRepository {
  private prisma = new PrismaClient()

  async getOrders(): Promise<Order[]> {
    const documents = await this.prisma.orders.findMany({})
    const ordersMapped = documents.map(
      (doc: any) => new Order(doc.status, doc.recipe, doc.createdAt),
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
    // await this.prisma.orders.update({
    //   where: {
    //     id,
    //   },
    //   data: {
    //     status,
    //   },
    // })
  }
}

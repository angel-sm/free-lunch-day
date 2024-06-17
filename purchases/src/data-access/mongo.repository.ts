import { IRepository } from '../models/IRepository.model'
import { PrismaClient } from '@prisma/client'
import { Purchase } from '../models/Purchase.model'

export class Repository implements IRepository {
  private prisma = new PrismaClient()

  async getPurchases(): Promise<Purchase[]> {
    const documents = await this.prisma.purchases.findMany({})
    const ordersMapped = documents.map(
      (doc: any) => new Purchase(doc.ingredient, doc.quantity),
    )
    return ordersMapped
  }

  async storePurchase(purchase: Purchase): Promise<void> {
    const { id, ingredient, quantity, createdAt } = purchase.ToPrimitive()
    await this.prisma.purchases.create({
      data: {
        id,
        ingredient,
        quantity,
        createdAt,
      },
    })
  }
}

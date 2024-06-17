import { Purchase } from './Purchase.model'

export interface IRepository {
  getPurchases(): Promise<Purchase[]>
  storePurchase(purchase: Purchase): Promise<void>
}

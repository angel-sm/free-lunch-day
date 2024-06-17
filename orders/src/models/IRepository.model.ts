import { Order } from './Order.model'

export interface IRepository {
  getOrders(): Promise<Order[]>
  storeOrder(purchase: Order): Promise<void>
  updateStatusOrder(id: string, data: 'finish'): Promise<void>
}

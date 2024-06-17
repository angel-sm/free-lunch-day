import { v4 } from 'uuid'

export class Purchase {
  private id: string
  private createdAt: Date

  constructor(
    private ingredient: string,
    private quantity: number,
  ) {
    this.id = v4()
    this.createdAt = new Date()
  }

  ToPrimitive() {
    return {
      id: this.id,
      ingredient: this.ingredient,
      quantity: this.quantity,
      createdAt: this.createdAt,
    }
  }
}

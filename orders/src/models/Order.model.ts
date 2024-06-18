import { v4 } from 'uuid'

export class Order {
  private createdAt: Date
  private updatedAt: Date

  constructor(
    private id: string,
    private status: 'progress' | 'finish',
    private recipe: string,
    createdAt?: Date,
  ) {
    this.createdAt = createdAt ?? new Date()
    this.updatedAt = new Date()
  }

  ToPrimitive() {
    return {
      id: this.id,
      status: this.status,
      recipe: this.recipe,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

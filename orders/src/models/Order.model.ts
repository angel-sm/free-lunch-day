import { v4 } from 'uuid'

export class Order {
  private id: string
  private createdAt: Date
  private updatedAt: Date

  constructor(
    private status: 'progress' | 'finish',
    private recipe: string,
    createdAt?: Date,
  ) {
    this.id = v4()
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

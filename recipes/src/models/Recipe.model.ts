import { v4 } from 'uuid'

type Ingredient = {
  ingredient: string
  quantity: number
}

export class Recipe {
  constructor(
    private id: string,
    private title: string,
    private description: string | null,
    private ingredients: Array<Ingredient>,
    private instructions: Array<string>,
    private cover: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  static Create({ title, description, ingredients, instructions, cover }: any) {
    const id = v4()
    const createdAt = new Date()
    const recipe = new Recipe(
      id,
      title,
      description,
      ingredients,
      instructions,
      cover,
      createdAt,
      createdAt,
    )

    return recipe
  }

  ToPrimitive() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      ingredients: this.ingredients,
      instructions: this.instructions,
      cover: this.cover,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}

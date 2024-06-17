export interface IRecipe {
  id: string;
  title: string;
  description: string | null;
  ingredients: Array<{
    id: string;
    ingredient: string;
    quantity: number;
  }>;
  instructions: Array<string>;
  cover: string;
  createdAt: Date;
  updatedAt: Date;
}

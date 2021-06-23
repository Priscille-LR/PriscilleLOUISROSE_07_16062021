export interface Recipe {
  id: number;
  name: string;
  servings: number;
  ingredients: Array<Ingredient>;
  time: number;
  description: string;
  appliance: string;
  utensils: Array<string>;
}

export interface Ingredient {
  ingredient: string;
  quantity?: number;
  unit?: string;
}

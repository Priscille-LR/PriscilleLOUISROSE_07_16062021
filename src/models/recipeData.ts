import { Recipe } from './recipe';

export interface RecipeData {
  keyword: string;
  recipes: Recipe[];
}

export class RecipeDataImplement implements RecipeData {
  /***
   * keyword => type string
   * recipes => type Recipe[]
   */
  constructor(public keyword: string, public recipes: Recipe[]) {}
}

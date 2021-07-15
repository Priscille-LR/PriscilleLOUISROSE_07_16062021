import { Recipe } from "../../models/recipe";

export interface ISearch {
    execute(query: string, recipesList: Recipe[]): Recipe[];
}
import { Recipe } from "../../models/recipe";

export interface ISearch {
    execute(query: string, recipesList: Recipe[]): Recipe[];
}


//takes user input recipes list and returns filtered list
//usable by front and back ends: no DOM element
export class Search implements ISearch {

    normalizeKeyword(keyword: string) : string{
        return keyword.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    }
    
    execute(query: string, recipesList: Recipe[]): Recipe[] {
        let formattedQuery: string[] = query.split(' ');
        let filteredRecipes: Recipe[] = [];

        const selectedRecipes = formattedQuery.map((inputKeyword) => {
          let recipes = [];
          for (const recipe of recipesList) {
            let name = this.normalizeKeyword(recipe.name).split(' ');
            let description = this.normalizeKeyword(recipe.description).split(' ');
            let ingredients = recipe.ingredients.map((ingredient) => {
              return this.normalizeKeyword(ingredient.ingredient)
            });
            if (name.some((item) => item.toLowerCase().match(inputKeyword))) {
              recipes.push(recipe);
            } else if (
              description.some((item) => item.toLowerCase().match(inputKeyword))
            ) {
              recipes.push(recipe);
            } else if (
              ingredients.some((item) => item.toLowerCase().match(inputKeyword))
            ) {
              recipes.push(recipe);
            }
          }
          return Array.from(new Set(recipes));
        });
    
        //check if element is contained in next recipe
        if (selectedRecipes.length == 1) {
          filteredRecipes = selectedRecipes.flat();
        } else {
          for (let i = 0; i < selectedRecipes.length - 1; i++) {
            let element: Recipe[];
            if (i >= 1) {
              element = filteredRecipes;
            } else {
              element = selectedRecipes[i];
            }
            const nextElement: Recipe[] = selectedRecipes[i + 1];
            filteredRecipes = element.filter((el) => {
              return nextElement.includes(el);
            });
          }
        }
        return filteredRecipes;
    }
}
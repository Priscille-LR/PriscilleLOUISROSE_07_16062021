import { Recipe } from '../../models/recipe';
import { recipesList } from '../recipesList';
import { Algo2DataGenerator } from './Algo2DataGenerator';

export interface ISearch {
  execute(query: string, recipesList: Recipe[]): Recipe[];
}

//takes user input recipes list and returns filtered list
//usable by front and back ends: no DOM element
export class Search implements ISearch {
  recipesData = new Algo2DataGenerator(recipesList).getKeywordsArray();

  execute(query: string, recipesList: Recipe[]): Recipe[] {
    //selectedRecipesArray = array of array of recipes
    let formattedQuery = query.split(' ');
    //let filteredRecipes: Recipe[] = [];

    let selectedRecipes = formattedQuery.map((inputKeyword) => {
      return this.recipesData
        .filter(
          (element) =>
            inputKeyword.length > 2 && element.keyword.includes(inputKeyword)
        )
        .map((data) => data.recipes) //get recipe (replace push in selected recipes)
        .flat();
    });

    //remove empty arrays in selected recipes: arrays created with "" user input - empty string
    selectedRecipes = selectedRecipes.filter((el) => {
      return el.length != 0;
    });

    if (selectedRecipes.length != 0) {
      selectedRecipes = [
        selectedRecipes.reduce((a: Array<Recipe>, b: Array<Recipe>) => //'and' search : get array intersection (check if c - el in a - is included in b)
          a.filter((c: Recipe) => b.includes(c))
        ),
      ];
    }
    return Array.from(new Set(selectedRecipes.flat()));
  }
}

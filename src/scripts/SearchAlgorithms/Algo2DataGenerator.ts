import { Recipe } from '../../models/recipe';
import { RecipeData, RecipeDataImplement } from '../../models/recipeData';

export class Algo2DataGenerator {
  private recipesData: Array<RecipeData> = [];

  constructor(readonly recipesList: Array<Recipe>) {
    this.updateKeywordsMap(recipesList);
  }

  getKeywordsArray(): Array<RecipeData> {
    return this.recipesData;
  }

  private updateKeywordsMap( recipesList: Array<Recipe>) {
    recipesList.forEach((recipe) => {
      let formattedKeywords: Array<string> = [];
      this.getKeywords(recipe, formattedKeywords);
      formattedKeywords = this.formatKeywords(formattedKeywords);
      this.addKeywordsToArray(formattedKeywords, recipe);
    });
  }


  private addKeywordsToArray(formattedKeywords: string[], recipe: Recipe) {
    let keywordsOfRecipeData = this.recipesData.map(
      (element) => element.keyword); //get existing keywords
    formattedKeywords.forEach((element) => { //for each formatted kw, check if it is already included in existing keywords
      if (keywordsOfRecipeData.includes(element)) { 
        let index = keywordsOfRecipeData.indexOf(element); // if it is, get index of element
        let recipes = this.recipesData[index].recipes; // use that index to get the recipes associated with the kw
        recipes.push(recipe); //then push the recipe in recipes 
      } else {
        this.recipesData.push(new RecipeDataImplement(element, [recipe])); //if it is not contained, push the formatted kw AND array of recipe in recipesData
      }
    });
  }

  private formatKeywords(keywords: string[]): string[] {
    const formattedKeywords = keywords
      .map((keyword) => {
        return keyword
          .split(' ')
          .map((key) => {
            return key
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .replace(',', '')
              .replace('.', '')
              .replace("l'", '')
              .replace("d'", '')
              .replace("'", '');
          })
          .filter((key) => {
            return key.length >= 3;
          });
      })
      .flat();
    return Array.from(new Set(formattedKeywords));
    //return [...new Set<string>(formattedKeywords)];
  }

  //get keywords from recipe in an array (keywords)
  private getKeywords(recipe: Recipe, keywords: string[]) {
    recipe.ingredients.forEach((ingredient) => {
      keywords.push(ingredient.ingredient);
    });
    keywords.push(recipe.description, recipe.name);
  }
}

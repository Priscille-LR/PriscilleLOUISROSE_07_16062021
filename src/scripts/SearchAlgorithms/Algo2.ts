import { recipesList } from '../recipesList';
import { Recipe } from '../../models/recipe';
import { RecipeCardsBuilder } from '../RecipesBuilder';
import { DropdownsBuilder } from '../DropdownsBuilder';
import { DropdownsHandler, selectedTags } from '../DropdownsHandler';
import { SearchBarAlgorithm } from './SearchBarAlgorithm';
import { RecipeData } from '../../models/recipeData';
import { ISearch } from './Search';
import { globalRecipesList } from '..';
import { Utils } from '../Utils';
import { Alerts } from '../Alerts';

export class Algo2 implements SearchBarAlgorithm {
  private readonly keywords: Array<RecipeData> = [];
  selectedRecipes: Array<Recipe> = [];

  constructor(
    public recipeBuilder: RecipeCardsBuilder,
    public dropdownsBuilder: DropdownsBuilder,
    public dropdownsHandler: DropdownsHandler,
    public search: ISearch,
    public alerts: Alerts
  ) {}

  searchRecipes(e: Event) {
    const userInput = (e.target as HTMLTextAreaElement).value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    Utils.clearArray(globalRecipesList);
    globalRecipesList.push(...recipesList);

    if (userInput.length >= 3) {
      const filteredRecipes = this.search.execute(userInput, globalRecipesList);
      Utils.clearArray(globalRecipesList);
      globalRecipesList.push(...filteredRecipes);
    }

    this.dropdownsBuilder.update(globalRecipesList, selectedTags);
    this.dropdownsHandler.updateSelectedRecipes();
    this.dropdownsHandler.refreshTags();
    this.recipeBuilder.update(globalRecipesList);
    this.alerts.handleAlert();
  }
}

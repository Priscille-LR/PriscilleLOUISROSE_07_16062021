import { recipesList } from '../recipesList';
import { SearchBarAlgorithm } from './SearchBarAlgorithm';
import { RecipeCardsBuilder } from '../RecipesBuilder';
import { DropdownsBuilder } from '../DropdownsBuilder';
import { DropdownsHandler, selectedTags } from '../DropdownsHandler';
import { ISearch } from './Search';
import { globalRecipesList } from '..';
import { Utils } from '../Utils';
import { Alerts } from '../Alerts';

export class Algo1 implements SearchBarAlgorithm {
  constructor(
    public recipeBuilder: RecipeCardsBuilder,
    public dropdownsBuilder: DropdownsBuilder,
    public dropdownsHandler: DropdownsHandler,
    public search: ISearch,
    public alerts: Alerts
  ) {}

  searchRecipes(e: Event) {
    let userInput = (e.target as HTMLTextAreaElement).value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    Utils.clearArray(globalRecipesList);
    globalRecipesList.push(...recipesList);

    if (userInput.length >= 3) {
      const filteredRecipes = this.search.execute(userInput, globalRecipesList);
      Utils.clearArray(globalRecipesList);
      globalRecipesList.push(...filteredRecipes); //push items of filtered recipes in global recipe list w/ ...
    }
    ;
    this.dropdownsBuilder.update(globalRecipesList, selectedTags);
    this.dropdownsHandler.updateSelectedRecipes();
    this.dropdownsHandler.refreshTags()
   
    this.recipeBuilder.update(globalRecipesList);
    this.alerts.handleAlert();
  }
}

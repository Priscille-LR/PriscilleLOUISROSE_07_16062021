import { RecipeCardsBuilder } from '../RecipesBuilder';
import { DropdownsBuilder } from '../DropdownsBuilder';
import { DropdownsHandler } from '../DropdownsHandler';

export class SearchBarAlgorithm {
  recipeBuilder: RecipeCardsBuilder;
  dropdownsBuilder: DropdownsBuilder;
  dropdownsHandler: DropdownsHandler;

  constructor(
    recipeBuilder: RecipeCardsBuilder,
    dropdownsBuilder: DropdownsBuilder,
    dropdownsHandler: DropdownsHandler
  ) {
    this.recipeBuilder = recipeBuilder;
    this.dropdownsBuilder = dropdownsBuilder;
    this.dropdownsHandler = dropdownsHandler;
  }
   search(e: Event) {}
}

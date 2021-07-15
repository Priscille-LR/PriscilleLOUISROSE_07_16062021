import { RecipeCardsBuilder } from '../RecipesBuilder';
import { DropdownsBuilder } from '../DropdownsBuilder';
import { DropdownsHandler } from '../DropdownsHandler';

export interface SearchBarAlgorithm {
  recipeBuilder: RecipeCardsBuilder;
  dropdownsBuilder: DropdownsBuilder;
  dropdownsHandler: DropdownsHandler; 
  searchRecipes(e: Event): void;
}


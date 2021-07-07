import { recipesList } from './recipesList';
import { RecipeCardsBuilder } from './RecipesBuilder';
import { DropdownsBuilder } from './DropdownsBuilder';
import { DropdownsHandler } from './DropdownsHandler';
import {SearchBarAlgorithm} from './SearchAlgorithms/SearchBarAlgorithm'

const recipeBuilder = new RecipeCardsBuilder(recipesList);
const dropdownsBuilder = new DropdownsBuilder(recipesList);
const dropdownsHandlerIngredients = new DropdownsHandler('ingredient', recipeBuilder);
const dropdownsHandlerAppliances = new DropdownsHandler('appliance', recipeBuilder);
const dropdownsHandlerUtensils = new DropdownsHandler('utensil', recipeBuilder);
const searchBarAlgorithm : SearchBarAlgorithm = null;

const searchBarInput = document.querySelector('.search-bar');
searchBarInput.addEventListener('input', (e) => searchBarAlgorithm.search(e));




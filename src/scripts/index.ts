import { recipesList } from './recipesList';
import { RecipeCardsBuilder } from './RecipesBuilder';
import { DropdownsBuilder } from './DropdownsBuilder';
import { DropdownsHandler } from './DropdownsHandler';
import {SearchBarAlgorithm} from './SearchAlgorithms/SearchBarAlgorithm'
import { ISearch } from './SearchAlgorithms/Search';
import { Alerts } from './Alerts';

export let globalRecipesList = recipesList.slice();

const recipeBuilder = new RecipeCardsBuilder(globalRecipesList);
const dropdownsBuilder = new DropdownsBuilder(globalRecipesList, []);
const search : ISearch = null;
const alerts = new Alerts();
const dropdownsHandler = new DropdownsHandler(recipeBuilder, dropdownsBuilder, alerts,  search);
const searchBarAlgorithm : SearchBarAlgorithm = null;

const searchBarInput = document.querySelector('.search-bar');
searchBarInput.addEventListener('input', (e) => searchBarAlgorithm?.searchRecipes(e)); //optional




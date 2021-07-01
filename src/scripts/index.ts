import { recipesList } from './recipesList';
import { RecipeCardsBuilder } from './RecipesBuilder';
import { DropdownsBuilder } from './DropdownsBuilder';
import { DropdownsHandler } from './DropdownsHandler';
import {SearchBarAlgorithm} from './SearchAlgorithms/SearchBarAlgorithm';
import { Algo2 } from './SearchAlgorithms/Algo2';
import { Search } from './SearchAlgorithms/Search';
import { Alerts } from './Alerts';

export let globalRecipesList = recipesList.slice();

const recipeBuilder = new RecipeCardsBuilder(recipesList);
const dropdownsBuilder = new DropdownsBuilder(recipesList, []);
const search = new Search();
const alerts = new Alerts();
const dropdownsHandler = new DropdownsHandler(recipeBuilder, dropdownsBuilder, alerts, search);
const searchBarAlgorithm : SearchBarAlgorithm = new Algo2(recipeBuilder, dropdownsBuilder, dropdownsHandler, search, alerts);

const searchBarInput = document.querySelector('.search-bar');
searchBarInput.addEventListener('input', (e) => searchBarAlgorithm?.searchRecipes(e));




import { recipesList } from './recipesList';
import { RecipeCardsBuilder } from './RecipesBuilder';
import { DropdownsBuilder } from './DropdownsBuilder';
import { DropdownsHandler } from './DropdownsHandler';
import {SearchBarAlgorithm} from './SearchAlgorithms/SearchBarAlgorithm'

const recipeBuilder = new RecipeCardsBuilder(recipesList);
const dropdownsBuilder = new DropdownsBuilder(recipesList, []);
const dropdownsHandler = new DropdownsHandler(recipeBuilder, dropdownsBuilder);
const searchBarAlgorithm : SearchBarAlgorithm = null;

const searchBarInput = document.querySelector('.search-bar');
searchBarInput.addEventListener('input', (e) => searchBarAlgorithm.search(e));




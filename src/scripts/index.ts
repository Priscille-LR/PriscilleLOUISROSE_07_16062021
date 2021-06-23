
import { recipesList } from "./recipesList";
import { RecipesBuilder } from "./RecipesBuilder";
import { Dropdown } from "./Dropdown";
import { Recipe } from '../models/recipe';


const recipeCard = new RecipesBuilder
const dropdownIngredients = new Dropdown

recipeCard.createRecipeCard(recipesList);

dropdownIngredients.createDropdowns(recipesList)
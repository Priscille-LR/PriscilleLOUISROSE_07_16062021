// import * as bootstrap from 'bootstrap';

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css
import '../scss/custom.scss';
import { recipesList } from "../src/recipesList";
import { Recipe, RecipesBuilder } from "../assets/Recipe";

const recipe = new RecipesBuilder

recipe.createRecipeCard(recipesList);
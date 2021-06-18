import { recipesList } from '../src/recipesList';

export interface Recipe {
  id: number;
  name: string;
  servings: number;
  ingredients: Array<Ingredient>;
  time: number;
  description: string;
  appliance: string;
  utensils: Array<string>;
}

interface Ingredient {
  ingredient: string;
  quantity?: number | string; //error?
  unit?: string;
}

export class RecipesBuilder {
  createRecipeCard(recipesList: Array<Recipe>) {
    recipesList.forEach((recipe) => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipes col-12 col-md-6 col-lg-4';
      recipeCard.innerHTML = `
            <div class="card rounded border-0" style="width: 20rem">
              <div class="card-header bg-secondary"></div>
              <div class="card-body bg-light">
                <div class="title-time">
                  <h5 class="card-title m-0 font-weight-light">
                    ${recipe.name}
                  </h5>
                  <div class="recipe_time">
                    <i class="far fa-clock"></i>
                    <h5 class="time">${recipe.time}min</h5>
                  </div>
                </div>
                <div class="ingredients-directions">
                  <ul class="ingredient-list list-group list-unstyled bg-light">
                  </ul>
                  <p class="card-text">
                  ${recipe.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
            `;
      this.getIngredients(recipe, recipeCard);
      document.querySelector('.recipes').appendChild(recipeCard);
    });
  }

  getIngredients(recipe: Recipe, recipeCard: HTMLDivElement) {
    recipe.ingredients.forEach((ingredient) => {
      const ingredients = document.createElement('li');
      ingredients.className = 'list-group-item p-0 bg-light';
      ingredients.style.border = "none";
      ingredients.innerHTML = `${ingredient.ingredient}: ${ingredient.quantity ?? ''} ${ingredient.unit ?? ''}`; //replace with empty string if el is undefined
      recipeCard.querySelector('.ingredient-list').appendChild(ingredients);
    });
  }
}

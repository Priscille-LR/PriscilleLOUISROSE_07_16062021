import { Recipe } from '../models/recipe';

export class RecipesBuilder {
  createRecipeCard(recipesList: Array<Recipe>) {
    recipesList.forEach((recipe) => {
      const recipeCard = document.createElement('div');
      recipeCard.className = 'recipe col-12 col-md-6 col-lg-4';
      recipeCard.innerHTML = `
            <div class="card rounded border-0">
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
                <div class="ingredients-directions row">
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
    const ingredients = recipeCard.querySelector('.ingredient-list');
    const ingredientsList = recipe.ingredients.map(ingredient => {
      if(ingredient.quantity) {
        return `<li class="ingredient">${ingredient.ingredient} : ${ingredient.quantity ?? ''} ${ingredient.unit ?? ''}</li>`
      } else {
        return `<li class="ingredient">${ingredient.ingredient}</li>`
      }
    })
    ingredients.innerHTML = ingredientsList.join(''); //reverses the elements in an array in place.

  }
}

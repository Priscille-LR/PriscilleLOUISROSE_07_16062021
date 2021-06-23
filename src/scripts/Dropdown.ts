import { Recipe } from '../models/recipe';
import { recipesList } from './recipesList';

export class Dropdown {
  ingredientsMap = new Map();
  applianceMap = new Map();
  utensilsMap = new Map();

  createDropdowns(recipesList: Array<Recipe>) {
    const dropdownIngredients = document.querySelector('.ingredients');
    const dropdownAppliances = document.querySelector('.appliances');
    const dropdownUtensils = document.querySelector('.utensils');

    recipesList.forEach((recipe) => {
      const id = recipe.id;
      recipe.ingredients.forEach((ingredient) => {
        let ingredientEl = ingredient.ingredient.toLowerCase();
        ingredientEl =
          ingredientEl.charAt(0).toUpperCase() + ingredientEl.slice(1);

        if (this.ingredientsMap.has(ingredientEl)) {
          let arrayIngredients = this.ingredientsMap.get(ingredientEl); 
          arrayIngredients.push(id); 
          this.ingredientsMap.set(ingredientEl, arrayIngredients); 
        } else {
          this.ingredientsMap.set(ingredientEl, [id]);
        }
      });
    });

    let ingredientsKeys = Array.from(this.ingredientsMap.keys());

    let ingredientsList = ingredientsKeys.map((ingredient) => {
      return `<li class="ingredient">${ingredient}</li>`;
    });

    ingredientsList.forEach((liIngredient) => {
      dropdownIngredients.innerHTML =
        dropdownIngredients.innerHTML + liIngredient;
    });




    recipesList.forEach((recipe) => {
      const id = recipe.id;
      let appliance = recipe.appliance.toLowerCase();
      appliance = appliance.charAt(0).toUpperCase() + appliance.slice(1);
      console.log(appliance);

      if (this.applianceMap.has(appliance)) {
        let arrayAppliances = this.applianceMap.get(appliance);
        arrayAppliances.push(id);
        this.applianceMap.set(appliance, arrayAppliances);
      } else {
        this.applianceMap.set(appliance, [id]);
      }
    });

    let appliancesKeys = Array.from(this.applianceMap.keys());
    let appliancesList = appliancesKeys.map((appliance) => {
      return `<li class="ingredient">${appliance}</li>`;
    });
    appliancesList.forEach((liAppliance) => {
      dropdownAppliances.innerHTML = dropdownAppliances.innerHTML + liAppliance;
    });





    recipesList.forEach((recipe) => {
      const id = recipe.id;
      recipe.utensils.forEach((utensil) => {
        let utensilEL = utensil.toLowerCase();
        utensilEL = utensilEL.charAt(0).toUpperCase() + utensilEL.slice(1);

        if (this.utensilsMap.has(utensilEL)) {
          let arrayUtensils = this.utensilsMap.get(utensilEL);
          arrayUtensils.push(id);
          this.utensilsMap.set(utensilEL, arrayUtensils);
        } else {
          this.utensilsMap.set(utensilEL, [id]);
        }
      });
    });

    let utensilsKeys = Array.from(this.utensilsMap.keys());
    let utensilsList = utensilsKeys.map((utensil) => {
      return `<li class="ingredient">${utensil}</li>`;
    });
    utensilsList.forEach((liUtensil) => {
      dropdownUtensils.innerHTML = dropdownUtensils.innerHTML + liUtensil;
    });
  }
}

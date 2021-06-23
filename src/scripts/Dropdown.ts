import { Recipe } from '../models/recipe';
import { recipesList } from './recipesList';

export class Dropdown {
  ingredientsMap = new Map();
  appliancesMap = new Map();
  utensilsMap = new Map();

  createDropdowns(recipesList: Array<Recipe>) {
    const dropdownIngredients = document.querySelector('.ingredients');
    const dropdownAppliances = document.querySelector('.appliances');
    const dropdownUtensils = document.querySelector('.utensils');

    recipesList.forEach((recipe) => {
      const id = recipe.id;
      recipe.ingredients.forEach((ingredient) => {
        this.createMap(ingredient.ingredient, recipe.id, this.ingredientsMap);
      });
    });
    this.createLi(dropdownIngredients, this.ingredientsMap, "ingredient");


    recipesList.forEach((recipe) => {
      this.createMap(recipe.appliance, recipe.id, this.appliancesMap);
    })
    this.createLi(dropdownAppliances, this.appliancesMap, "appliance")


    recipesList.forEach((recipe) => {
      const id = recipe.id;
      recipe.utensils.forEach((utensil) => {
        this.createMap(utensil, id, this.utensilsMap);
      });
    });
    this.createLi(dropdownUtensils, this.utensilsMap, "utensil")
  }


  private createLi(HTMLElement: Element, map: Map<string, Array<number>>, className: string) {
    let filterKeys = Array.from(map.keys());

    let filterList = filterKeys.map((element) => {
      return  `<li class="${className}">${element}</li>`;
    });

    filterList.forEach((li) => {
      HTMLElement.innerHTML = HTMLElement.innerHTML + li;
    });
  }


  private createMap(filter: string, id: number, map: Map<String, Array<Number>>) {
    let key = filter.toLowerCase();
    key = key.charAt(0).toUpperCase() + key.slice(1);

    if (map.has(key)) {
      let array = map.get(key);
      array.push(id);
      map.set(key, array);
    } else {
      map.set(key, [id]);
    }
  }
}

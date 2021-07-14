import { Recipe } from '../models/recipe';

export const ingredientsMap = new Map();
export const appliancesMap = new Map();
export const utensilsMap = new Map();

export class DropdownsBuilder {

  constructor(recipesList: Array<Recipe>) {
    this.createDropdowns(recipesList);
  }

   createDropdowns(recipesList: Array<Recipe>) {
    ingredientsMap.clear();
    appliancesMap.clear();
    utensilsMap.clear();
    const dropdownAppliances = document.querySelector('.appliances-list');
    const dropdownUtensils = document.querySelector('.utensils-list');
    const dropdownIngredients = document.querySelector('.ingredients-list')
     
    recipesList.forEach((recipe) => {
      const id = recipe.id;
      recipe.ingredients.forEach((ingredient) => {
        this.updateMap(ingredient.ingredient, recipe.id, ingredientsMap);
      });
    });
    this.createLi(dropdownIngredients, ingredientsMap, "list-item ingredient");


    recipesList.forEach((recipe) => {
      this.updateMap(recipe.appliance, recipe.id, appliancesMap);
    })
    this.createLi(dropdownAppliances, appliancesMap, "list-item appliance");


    recipesList.forEach((recipe) => {
      const id = recipe.id;
      recipe.utensils.forEach((utensil) => {
        this.updateMap(utensil, id, utensilsMap);
      });
    });
    this.createLi(dropdownUtensils, utensilsMap, "list-item utensil");
  }


  
//create map of ingredient/appliance/utensil + ID of recipes used
  private updateMap(filter: string, id: number, map: Map<String, Array<Number>>) {
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

  private createLi(HTMLElement: Element, map: Map<string, Array<number>>, className: string) {
    let filterKeys = Array.from(map.keys());

    let filterList = filterKeys.map((element) => {
      return  `<li class="${className}">${element}</li>`;
    });

    filterList.forEach((li) => {
      HTMLElement.innerHTML = HTMLElement.innerHTML + li;
    });
  }

  update(recipesList: Array<Recipe>) {
    this.removeChildOf('.ingredients-list', 'ingredient');
    this.removeChildOf('.appliances-list', 'appliance');
    this.removeChildOf('.utensils-list', 'utensil');
    this.createDropdowns(recipesList);
  }

  private removeChildOf(node: string, classToRemove: string) {
    const parentNode = document.querySelector(node);

    for (let index = parentNode.childNodes.length - 1; index >= 0; index--) {
      const child = parentNode.childNodes[index] as HTMLElement;
      if (child.className.split(' ')[0] == classToRemove) {
        parentNode.removeChild(child);
      }
    }
  }
}

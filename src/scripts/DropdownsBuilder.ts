import { globalRecipesList } from '.';
import { Recipe } from '../models/recipe';
import { recipesList } from './recipesList';

export const ingredientsMap = new Map();
export const appliancesMap = new Map();
export const utensilsMap = new Map();

export class DropdownsBuilder {
  
  constructor(recipesList: Array<Recipe>, selectedTags: Array<string>) {
    this.createDropdowns(recipesList, selectedTags);
  }

   createDropdowns(recipesList: Array<Recipe>, selectedTags: Array<string>) {
    ingredientsMap.clear();
    appliancesMap.clear();
    utensilsMap.clear();
    const dropdownAppliances = document.querySelector('.appliances-list');
    const dropdownUtensils = document.querySelector('.utensils-list');
    const dropdownIngredients = document.querySelector('.ingredients-list')
     
    recipesList.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        this.updateMap(ingredient.ingredient, recipe.id, ingredientsMap, selectedTags);
      });
    });
    this.createLi(dropdownIngredients, ingredientsMap, "list-item ingredient");

    recipesList.forEach((recipe) => {
      this.updateMap(recipe.appliance, recipe.id, appliancesMap, selectedTags);
    })
    this.createLi(dropdownAppliances, appliancesMap, "list-item appliance");

    recipesList.forEach((recipe) => {
      recipe.utensils.forEach((utensil) => {
        this.updateMap(utensil, recipe.id, utensilsMap, selectedTags);
      });
    });
    this.createLi(dropdownUtensils, utensilsMap, "list-item utensil");
  }
  
//create map of ingredient/appliance/utensil + ID of recipes used
private updateMap(filter: string, id: number, map: Map<String, Array<Number>>, selectedTags: Array<string>) {
  let key = filter.toLowerCase();
  key = key.charAt(0).toUpperCase() + key.slice(1);
  if(!selectedTags.includes(key) || globalRecipesList.length == recipesList.length) { //check if key isn't contained in selected tags => prevent tag from being selected twice: if tag has been selected, it doesn't appear in the dropdown anymore
    if (map.has(key)) {
      let idsArray = map.get(key);
      idsArray.push(id);
      map.set(key, idsArray);
    } else {
      map.set(key, [id]);
    }
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
  
  sort() {
    const liItems = Array.from(document.getElementsByClassName('ingredient'))
    console.log(liItems)
    const sortedIng = liItems.sort((a, b) => a.textContent.localeCompare(b.textContent, 'fr'));
    console.log(sortedIng)
  }

  update(recipesList: Array<Recipe>, selectedTags?: Array<string>) {
    this.removeChildOf('.ingredients-list', 'ingredient');
    this.removeChildOf('.appliances-list', 'appliance');
    this.removeChildOf('.utensils-list', 'utensil');
    this.createDropdowns(recipesList, selectedTags);
  }

  private removeChildOf(node: string, classToRemove: string) {
    const parentNode = document.querySelector(node);
  
    for (let index = parentNode.childNodes.length - 1; index >= 0; index--) {
      const child = parentNode.childNodes[index] as HTMLElement;
    
      if (child.className.split(' ')[1] == classToRemove) {
        parentNode.removeChild(child);
      }
    }
  }
}

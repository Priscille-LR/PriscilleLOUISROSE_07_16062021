import { DropdownsBuilder } from './DropdownsBuilder';
import { ingredientsMap, appliancesMap, utensilsMap } from './DropdownsBuilder';

export class DropdownsHandler {

  constructor() {
    this.openDropdown();
    this.closeDropdown();
    this.onUserInput();
    this.displayTag();
  }

  openDropdown() {
    const dropdownIngredientsButton = document.querySelector('.button-ingredients');
    const ingredientsList = document.querySelector('.ingredients-list-wrapper') as HTMLElement;
    const inputIngredients = document.getElementById('input-ingredients');

    dropdownIngredientsButton.addEventListener('click', () => {
      ingredientsList.style.display = 'block';
      inputIngredients.focus();
    });
  }

  closeDropdown() {
    const toggleButton = document.querySelector('.close-dropdown-ing');
    const ingredientsList = document.querySelector('.ingredients-list-wrapper') as HTMLElement;

    toggleButton.addEventListener('click', () => {
      ingredientsList.style.display = 'none';
    });
  }

  onUserInput() {
    const inputIngredients = document.getElementById('input-ingredients');
    inputIngredients.addEventListener('input', (e) => this.updateDropdown(e));
  }

  updateDropdown(e: Event) {
    const userInput = (e.target as HTMLTextAreaElement).value.toLowerCase();
    const ingredients = document.getElementsByClassName('ingredient');
    const ingredientsArray = Array.from(ingredients) as Array<HTMLElement>;

    ingredientsArray.forEach((ingredient) => {
      if (
        userInput.length >= 3 &&
        ingredient.innerHTML.toLowerCase().includes(userInput)
      ) {
        ingredient.style.display = 'block';
      } else {
        ingredient.style.display = 'none';
      }
    });
  }

  displayTag() {
    const ingredients = document.getElementsByClassName('ingredient');
    const ingredientsArray = Array.from(ingredients);
    //let selectedTag = []

    ingredientsArray.forEach((ingredient) => {
      ingredient.addEventListener('click', () => {
        this.createTag(ingredient);
        //selectedTag.push(ingredient);
      });
    });
  }

    private createTag(ingredient: Element) {
        const tags = document.querySelector('.tags');
        const ingredientTag = document.createElement('span');
        ingredientTag.className = 'ingredient-tag rounded';
        ingredientTag.innerHTML = `${ingredient.innerHTML} <i class="close-tag far fa-times-circle"></i>`;
        const closeTag = ingredientTag.querySelector('.close-tag');
        
        closeTag.addEventListener('click', () => {
            ingredientTag.remove();
        });

        tags.appendChild(ingredientTag);
    }
}

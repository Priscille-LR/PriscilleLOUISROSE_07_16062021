import { DropdownsBuilder } from './DropdownsBuilder';
import { ingredientsMap, appliancesMap, utensilsMap } from './DropdownsBuilder';
import { recipesList } from './recipesList';
import { RecipeCardsBuilder } from './RecipesBuilder';
import { Recipe } from '../models/recipe';

export class DropdownsHandler {
  selectedTags: Array<string> = [];
  selectedRecipes: Array<Recipe> = [];
  recipesBuilder: RecipeCardsBuilder;
  dropdownsBuilder: DropdownsBuilder;
  selectedTagsMap = new Map();
  typeArray: Array<string> = ['ingredient', 'appliance', 'utensil'];
  
  constructor(
    recipesBuilder: RecipeCardsBuilder,
    dropdownsBuilder: DropdownsBuilder
  ) {

    this.recipesBuilder = recipesBuilder;
    this.dropdownsBuilder = dropdownsBuilder;

    this.typeArray.forEach(type => {
      let list: string = `.${type}-list-wrapper`;
      let input: string = `input-${type}`;
      this.openDropdown(type, list, input);
      this.closeDropdown(type, list);
      this.userInputListener(type, input);
    });
    this.displayTag();
  }

  openDropdown(type: string, list: string, input: string) {
    let dropdown: string = `.button-${type}`;
    const dropdownButton = document.querySelector(dropdown);
    const dropdownList = document.querySelector(list) as HTMLElement;
    const dropdownInput = document.getElementById(input);
    const backdrop = document.getElementById('backdrop');

    dropdownButton.addEventListener('click', () => {
      dropdownList.classList.add('expanded');
      backdrop.classList.add('expanded');
      dropdownInput.focus();
    });
  }

  closeDropdown(type: string, list: string) {
    let close: string = `.close-dropdown-${type}`;
    const toggleButton = document.querySelector(close);
    const dropdownList = document.querySelector(list) as HTMLElement;
    const backdrop = document.getElementById('backdrop');

    toggleButton.addEventListener('click', () => {
      dropdownList.classList.remove('expanded');
    });

    this.closeDropdownOnBackdropClick(backdrop, dropdownList);
  }

  private closeDropdownOnBackdropClick(
    backdrop: HTMLElement,
    dropdownList: HTMLElement
  ) {
    backdrop.addEventListener('click', () => {
      dropdownList.classList.remove('expanded');
      backdrop.classList.remove('expanded');
    });
  }

  userInputListener(type: string, input: string) {
    const dropdownInput = document.getElementById(input);
    dropdownInput.addEventListener('input', (e) =>
      this.updateDropdownOnInput(e, type)
    );
  }

  updateDropdownOnInput(e: Event, type: string) {
    const userInput = (e.target as HTMLTextAreaElement).value.toLowerCase();
    const dropdownItem = document.getElementsByClassName(type);
    const dropdownArray = Array.from(dropdownItem) as Array<HTMLElement>;

    dropdownArray.forEach((dropdownItem) => {
      if (
        userInput.length >= 3 &&
        dropdownItem.innerHTML.toLowerCase().includes(userInput)
      ) {
        dropdownItem.style.display = 'block';
      } else {
        dropdownItem.style.display = 'none';
      }
    });
  }

  displayTag() {
    this.typeArray.forEach(type => {
      const dropdownItem = document.getElementsByClassName(type);
      const dropdownArray = Array.from(dropdownItem);
      
      dropdownArray.forEach((element) => {
        element.addEventListener('click', () => {
          this.createTag(element, type);
          this.selectedTags.push(element.innerHTML);
          this.updateSelectedRecipes();
          this.recipesBuilder.update(this.selectedRecipes);
          this.dropdownsBuilder.update(this.selectedRecipes, this.selectedTags);
          this.displayTag();
        });
      });
    })
  }

  private updateSelectedRecipes() {
    this.selectedRecipes = [];

    let selectedRecipesIds = this.selectedTags.map((tag) => {
      let storedIds = [];
      [ingredientsMap,
        appliancesMap,
        utensilsMap,
        this.selectedTagsMap,
      ].forEach((map) => {
        let ids: Number[] | undefined = map.get(tag); //can return undef
        if (map.has(tag)) {
          storedIds.push(ids);
        }
      });
      return storedIds.flat();
    });

    //create new map with selected tags, bc of maps update in dropdowns builder updateMap()
    for (let index = 0; index < this.selectedTags.length; index++) {
      const key = this.selectedTags[index];
      const value = selectedRecipesIds[index];
      this.selectedTagsMap.set(key, value);
    }

    if (selectedRecipesIds.length == 0) {
      this.selectedRecipes = recipesList;
    } else {
      selectedRecipesIds = selectedRecipesIds
        .reduce((a: Array<number>, b: Array<number>) =>
          a.filter((c: number) => b.includes(c)))
        .flat();

      let selectedRecipesList = selectedRecipesIds.flat().map((id: number) => {
        let storedRecipes = [];
        recipesList.forEach((recipe) => {
          if (id === recipe.id) {
            storedRecipes.push(recipe);
          }
        });
        return storedRecipes;
      });
      this.selectedRecipes = Array.from(new Set(selectedRecipesList.flat()));
    }
  }

  private createTag(element: Element, type: string) {
    const tags = document.querySelector('.tags');
    const tag = document.createElement('span');
    let tagItem: string = `${type}-tag rounded`;
    tag.className = `tag ${tagItem}`;
    tag.innerHTML = `${element.innerHTML} <i class="close-tag far fa-times-circle"></i>`;
    
    this.handleTag(tag, element);
    
    tags.appendChild(tag);
  }
  
  private handleTag(tag: HTMLSpanElement, element: Element) {
    const closeTag = tag.querySelector('.close-tag');
    closeTag.addEventListener('click', () => {
      tag.remove();

      this.selectedTags = this.selectedTags.filter((tag) => {
        return tag != element.innerHTML;
      }); //return if selected tag is different from deleted tag

      this.updateSelectedRecipes();
      const recipes = this.selectedRecipes.length == 0 ? recipesList : this.selectedRecipes;
      this.recipesBuilder.update(recipes);
      this.dropdownsBuilder.update(recipes, this.selectedTags);
      this.displayTag();
    });
  }
}

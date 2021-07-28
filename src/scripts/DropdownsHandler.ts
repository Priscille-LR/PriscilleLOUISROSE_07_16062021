import { DropdownsBuilder } from './DropdownsBuilder';
import { ingredientsMap, appliancesMap, utensilsMap } from './DropdownsBuilder';
import { RecipeCardsBuilder } from './RecipesBuilder';
import { globalRecipesList } from '.';
import { Utils } from './Utils';
import { recipesList } from './recipesList';
import { ISearch } from "./SearchAlgorithms/Search";
import { Alerts } from '../scripts/Alerts';

export let selectedTags: Array<string> = [];

export class DropdownsHandler {
  selectedTagsMap = new Map();
  typeArray: Array<string> = ['ingredient', 'appliance', 'utensil'];
  
  constructor(
    public recipesBuilder: RecipeCardsBuilder,
    public dropdownsBuilder: DropdownsBuilder,
    public alerts: Alerts,
    public search?: ISearch, 
  ) {
  

    this.typeArray.forEach(type => {
      let list: string = `.${type}-list-wrapper`;
      let input: string = `input-${type}`;
      this.openDropdown(type, list, input);
      this.closeDropdown(type, list);
      this.userInputListener(type, input);
    });
    this.refreshTags();
  }

  openDropdown(type: string, list: string, input: string) {
    let dropdown: string = `.button-${type}`;
    const dropdownButton = document.querySelector(dropdown);
    const dropdownList = document.querySelector(list) as HTMLElement;
    const dropdownInput = document.getElementById(input);
    const backdrop = document.getElementById('backdrop');

    dropdownButton.addEventListener('click', () => {
      dropdownButton.classList.add('opened');
      dropdownList.classList.add('expanded');
      backdrop.classList.add('expanded');
      dropdownInput.focus();
    });
  }

  closeDropdown(type: string, list: string) {
    let close: string = `.close-dropdown-${type}`;
    let dropdown: string = `.button-${type}`;
    const dropdownButton = document.querySelector(dropdown);
    const toggleButton = document.querySelector(close);
    const dropdownList = document.querySelector(list) as HTMLElement;
    const backdrop = document.getElementById('backdrop');

    toggleButton.addEventListener('click', () => {
      dropdownButton.classList.remove('opened');
      dropdownList.classList.remove('expanded');
    });

    this.closeDropdownOnBackdropClick(type, backdrop, dropdownList);
  }

  private closeDropdownOnBackdropClick(
    type: string,
    backdrop: HTMLElement,
    dropdownList: HTMLElement
  ) {
    let dropdown: string = `.button-${type}`;
    const dropdownButton = document.querySelector(dropdown);
    
    backdrop.addEventListener('click', () => {
      dropdownButton.classList.remove('opened');
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
      } else if(userInput.length >= 3 &&
        !dropdownItem.innerHTML.toLowerCase().includes(userInput)){
        dropdownItem.style.display = 'none';
      } else if(userInput.length < 2 ){
        dropdownItem.style.display = 'block';
      }
    });
  }

  refreshTags() {
    this.typeArray.forEach(type => {
      const dropdownItem = document.getElementsByClassName(type);
      const dropdownArray = Array.from(dropdownItem);
      
      dropdownArray.forEach((element) => {
        element.addEventListener('click', () => {
          
          this.createTag(element, type);
          selectedTags.push(element.innerHTML);
         
          this.updateSelectedRecipes();
          this.recipesBuilder.update(globalRecipesList);
          this.dropdownsBuilder.update(globalRecipesList, selectedTags);
          this.refreshTags();
          this.alerts.handleAlert();
        });
      });
    })
  }

  updateSelectedRecipes() {
    let selectedRecipesIds = selectedTags.map((tag) => {
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

    //update selected tags map, bc of maps update in dropdowns builder updateMap()
    for (let index = 0; index < selectedTags.length; index++) {
      const key = selectedTags[index];
      const value = selectedRecipesIds[index];
      this.selectedTagsMap.set(key, value);
    }

    if (selectedRecipesIds.length != 0) {

      selectedRecipesIds = selectedRecipesIds
        .reduce((a: Array<number>, b: Array<number>) =>
          a.filter((c: number) => b.includes(c)))
        .flat();

      let selectedRecipesList = selectedRecipesIds.flat().map((id: number) => {
        let storedRecipes = [];
        globalRecipesList.forEach((recipe) => {
          if (id === recipe.id) {
            storedRecipes.push(recipe);
          }
        });
        return storedRecipes;
      });
      Utils.clearArray(globalRecipesList);
      globalRecipesList.push(...Array.from(new Set(selectedRecipesList.flat())));
      
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
      
      selectedTags = selectedTags.filter((tag) => {
        return tag != element.innerHTML;
      }); //return if selected tag is different from deleted tag
    

      Utils.clearArray(globalRecipesList)
      globalRecipesList.push(...recipesList)
    
      const userInput = document.querySelector('.search-bar') as HTMLInputElement

      if (userInput.value.length >= 3) {
        let filteredRecipes = this.search?.execute(userInput.value, globalRecipesList) ?? []; //if null (bc optional param) filteredRecipes empty
        Utils.clearArray(globalRecipesList)
        globalRecipesList.push(...filteredRecipes);
      }

      this.updateSelectedRecipes();
      
      this.recipesBuilder.update(globalRecipesList);
      this.dropdownsBuilder.update(globalRecipesList, selectedTags);
      this.refreshTags();
      this.alerts.handleAlert();
    });
  }
}

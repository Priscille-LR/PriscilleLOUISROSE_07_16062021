import { DropdownsBuilder } from './DropdownsBuilder';
import { ingredientsMap, appliancesMap, utensilsMap } from './DropdownsBuilder';
import { recipesList } from './recipesList';
import { RecipeCardsBuilder } from './RecipesBuilder';

export class DropdownsHandler {
  selectedTags = [];
  selectedRecipes = [];
  recipesBuilder: RecipeCardsBuilder;

  constructor(type: string, recipesBuilder: RecipeCardsBuilder) {
    let dropdown: string = `.button-${type}`;
    let list: string = `.${type}-list-wrapper`;
    let input: string = `input-${type}`;
    let close: string = `.close-dropdown-${type}`;
    let item: string = `${type}`;
    let tagItem: string = `${type}-tag rounded`;
    this.recipesBuilder = recipesBuilder;
    this.openDropdown(dropdown, list, input);
    this.closeDropdown(close, list);
    this.onUserInput(input, item);
    this.displayTag(item, tagItem);
  }

  openDropdown(dropdown: string, list: string, input: string) {
    const dropdownButton = document.querySelector(dropdown);
    const dropdownList = document.querySelector(list) as HTMLElement;
    const dropdownInput = document.getElementById(input);

    dropdownButton.addEventListener('click', () => {
      dropdownList.style.display = 'block';
      dropdownInput.focus();
    });
  }

  closeDropdown(close: string, list: string) {
    const toggleButton = document.querySelector(close);
    const dropdownList = document.querySelector(list) as HTMLElement;

    toggleButton.addEventListener('click', () => {
      dropdownList.style.display = 'none';
    });
  }

  onUserInput(input: string, item: string) {
    const dropdownInput = document.getElementById(input);
    dropdownInput.addEventListener('input', (e) =>
      this.updateDropdown(e, item)
    );
  }

  updateDropdown(e: Event, item: string) {
    const userInput = (e.target as HTMLTextAreaElement).value.toLowerCase();
    const dropdownItem = document.getElementsByClassName(item);
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

  displayTag(item: string, tagItem: string) {
    const dropdownItem = document.getElementsByClassName(item);
    const dropdownArray = Array.from(dropdownItem);

    dropdownArray.forEach((element) => {
      element.addEventListener('click', () => {
        this.createTag(element, tagItem);
        this.selectedTags.push(element.innerHTML);
        element.classList.add('selected');

        this.updateSelectedRecipes();

        this.recipesBuilder.update(this.selectedRecipes);
      });
    });
  }

  private updateSelectedRecipes() {
    this.selectedRecipes = [];
    [ingredientsMap, appliancesMap, utensilsMap].forEach((map) => {
      this.selectedTags.forEach((tag) => {
        let ids: Number[] | undefined = map.get(tag); //can return undef
        recipesList.forEach((recipe) => {
          ids?.forEach((id) => {
            if (recipe.id === id) {
              this.selectedRecipes.push(recipe);
            }
          });
        });
      });
    });

    this.selectedRecipes = Array.from(new Set(this.selectedRecipes));
  }

  private createTag(element: Element, tagItem: string) {
    const tags = document.querySelector('.tags');
    const tag = document.createElement('span');
    tag.className = `tag ${tagItem}`;
    tag.innerHTML = `${element.innerHTML} <i class="close-tag far fa-times-circle"></i>`;
    const closeTag = tag.querySelector('.close-tag');

    closeTag.addEventListener('click', () => {
      tag.remove();
      element.classList.remove('selected');

      this.selectedTags = this.selectedTags.filter((tag) => {
        return tag != element.innerHTML;
      });

      this.updateSelectedRecipes();

      this.recipesBuilder.update(
        this.selectedRecipes.length == 0 ? recipesList : this.selectedRecipes
      );
    });

    tags.appendChild(tag);
  }
}

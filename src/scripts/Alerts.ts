import { globalRecipesList } from '../scripts/index';
import { recipesList } from './recipesList';

export class Alerts {

  handleAlert() {
    const userInput = document.querySelector('.search-bar') as HTMLInputElement;
    const alert = document.querySelector('.alert');

    if (userInput.value.length != 0 && globalRecipesList.length == 0) {
      this.showDangerAlert(alert);
    } else if (
      userInput.value.length < 3 &&
      globalRecipesList.length == recipesList.length
    ) {
      alert.classList.remove('displayed');
    } else {
      this.showSuccesAlert(alert);
    }

    this.closeAlert(alert);
  }

  private showSuccesAlert(alert: Element) {
    alert.classList.add('alert-success');
    alert.classList.add('displayed');
    alert.classList.remove('alert-danger');
    if (globalRecipesList.length > 1) {
      alert.innerHTML = `
            ${globalRecipesList.length} recettes correspondent à votre recherche
            <i class="close-alert far fa-times-circle"></i>
            `;
    } else {
      alert.innerHTML = `
            ${globalRecipesList.length} recette correspond à votre recherche
            <i class="close-alert far fa-times-circle"></i>
            `;
    }
  }

  private showDangerAlert(alert: Element) {
    alert.classList.add('alert-danger');
    alert.classList.add('displayed');
    alert.classList.remove('alert-success');
    alert.innerHTML = `
      Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.
      <i class="close-alert far fa-times-circle"></i>
      `;
  }

  closeAlert(alert: Element) {
    if (alert.classList.contains('displayed')) {
      const closeAlertButton = document.querySelector('.close-alert');
      closeAlertButton.addEventListener('click', () => {
        alert.classList.remove('displayed');
      });
    }
  }
}

export class Utils {

  static removeChildOf(node: string, classToRemove: string) {
    const parentNode = document.querySelector(node);

    for (let index = parentNode.childNodes.length - 1; index >= 0; index--) {
      const child = parentNode.childNodes[index] as HTMLElement;
      if (child.className.split(' ')[0] == classToRemove) {
        parentNode.removeChild(child);
      }
    }
  }
}

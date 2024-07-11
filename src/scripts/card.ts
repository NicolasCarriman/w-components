
class CustomCard extends HTMLElement {

  constructor() {
    super();
    // functionalities for the component
    const template = document.getElementById('card-template') as HTMLTemplateElement;
    const node = document.importNode(template.content, true);
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(node);
  }

  connectedCallback() {
    // when the card is inserted into the DOM
  }

}

customElements.define('card-component', CustomCard);

interface CardSettings {
  name: string;
  description: string;
}

export function createCardElement(settings: CardSettings): HTMLElement {
  
  const element = document.createElement('card-component');
  const name = document.createElement('span');
  const description = document.createElement('span')
  
  name.setAttribute('slot', 'card-name');
  name.textContent = settings.name;
  description.setAttribute('slot', 'card-description');
  description.classList.add('c-description');
  description.textContent = settings.description;
  element.appendChild(name);
  element.appendChild(description);

  return element;
};

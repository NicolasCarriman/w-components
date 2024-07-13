
class CustomCard extends HTMLElement {

  constructor() {
    super();
    // functionalities for the component
    const template = document.getElementById('card-template') as HTMLTemplateElement;
    const node = document.importNode(template.content, true);
    const shadowRoot = this.attachShadow({ mode: "open" });
    console.log(template)
    shadowRoot.appendChild(node);

  }

  connectedCallback() {
    // when the card is inserted into the DOM
  }

}

customElements.define('card-component', CustomCard);

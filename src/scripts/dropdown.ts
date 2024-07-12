
const templateContent = `
<link rel="stylesheet" href="/src/style.css" />
<div class="background" id="ddBackground"></div>
<div class="flex flex-col items-center w-full">
  <label class="label flex flex-row items-center gap-2 hover:text-primary cursor-pointer" id="ddLabel">
    <a></a>
     <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0.734863L4.99999 4.73486L1 0.734863" stroke="currentColor" stroke-width="1.48148"
          stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  </label>
  <div class="flex flex-col mt-16 hidden relative bg-primary text-white p-2 rounded gap-2 w-full left-[0%] items-center" id="ddContent">
    <slot name="content-slot" ></slot>
  </div>
</div>`;

class CustomDropdown extends HTMLElement {

  constructor() {
    super();

    const template = document.createElement('template') as HTMLTemplateElement;
    template.innerHTML = templateContent;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const node = document.importNode(template.content, true);
    shadowRoot.appendChild(node);

    const background = shadowRoot.querySelector('#ddBackground');
    const label = shadowRoot.querySelector('#ddLabel');
    const content = shadowRoot.querySelector('#ddContent');

    if (!content || !label || !background) throw new Error("please provide ddLabel or ddBackground or ddContent ");
    label.children[0].textContent = this.title;

    function togleContent() {
      if (!content) throw new Error('Content element not found');
      const isHidden = content.classList.contains('hidden');

      if (isHidden) {
        content.classList.remove('hidden');
        content.classList.remove('relative');
        content.classList.add('absolute');
        content.classList.add('animate-zoom');
        content.classList.add('m-auto');
        return;
      }

      content.classList.add('hidden');
      content.classList.add('relative');
      content.classList.remove('absolute');
      content.classList.remove('m-auto');
    }

    label.addEventListener('click', togleContent)
  }

  connectedCallback() {
    // when the card is inserted into the DOM
    console.log(this.title)
  }

}


customElements.define('dropdown-component', CustomDropdown);
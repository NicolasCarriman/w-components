const content = `
<link rel="stylesheet" href="/src/style.css" />
<div class="overflow-hidden flex max-h-[1.5rem] ">
  <div id="sliderY" class="flex flex-col justify-start hover:animate-slideY">
    <slot name="slider-content-slot"></slot>
  </div>
</div>`;

export class CustomSlider extends HTMLElement {

  constructor() {
    super();
		const template = document.createElement('template') as HTMLTemplateElement;
		template.innerHTML = content;
    
		const shadowRoot = this.attachShadow({ mode: 'open' });
		const node = document.importNode(template.content, true);
		shadowRoot.appendChild(node);

    const slot = shadowRoot.querySelector('slot[name="slider-content-slot"]') as HTMLSlotElement;
    const labelContent = slot.assignedNodes()[0];
    const clonedLabel = document.createElement('label') as HTMLLabelElement;
    const parent = slot.parentElement as HTMLDivElement;
    clonedLabel.textContent = labelContent.textContent;
    parent.appendChild(clonedLabel);

  }

}
customElements.define('slider-component', CustomSlider);

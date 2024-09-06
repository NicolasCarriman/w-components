const templateContent = `
<link rel="stylesheet" href="/src/style.css" />
<div class="flex flex-col items-center w-full">
  <label class="label flex flex-row items-center gap-2 hover:text-primary cursor-pointer" >
		<slot name="label-slot"></slot>
		<svg id="ddArrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 0.734863L4.99999 4.73486L1 0.734863" stroke="currentColor" stroke-width="1.48148"
          stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  </label>
  <div class="flex-col mt-16 hidden relative background text-white p-2 rounded gap-2 w-full left-[0%] items-center" id="ddContent">
    <slot name="content-slot" ></slot>
  </div>
</div>`;

class CustomDropdown extends HTMLElement {
	private parentId: null | string = null;

	constructor() {
		super();

		const template = document.createElement('template') as HTMLTemplateElement;
		template.innerHTML = templateContent;

		const shadowRoot = this.attachShadow({ mode: 'open' });
		const node = document.importNode(template.content, true);
		shadowRoot.appendChild(node);

		const label = shadowRoot.querySelector('slot[name="label-slot"]') as HTMLSlotElement;
		const content = shadowRoot.querySelector('#ddContent');

		if (!content || !label ) throw new Error("please provide ddLabel or ddContent ");
		label.textContent = this.title;
		const labelContainer = label.parentElement;
		if (!labelContainer) return;

		function showContent() {

			if (!content) throw new Error('Content element not found');

			const isHidden = content.classList.contains('hidden');
			if (!isHidden) return;

			content.classList.remove('hidden');
			content.classList.remove('relative');
			content.classList.add('absolute');
			content.classList.add('animate-zoom');
			content.classList.add('m-auto');
			content.classList.add('flex');

		}

		labelContainer.addEventListener('mouseover', showContent);

	}

	connectedCallback() {

		const parentId = this.getAttribute('parentId');
		if (!parentId) throw new Error('Parent must be provided as attribute in the web component');

		this.parentId = parentId;
		this.attachParent();

	}

	attachParent() {

		if (!this.parentId) throw new Error('Parent must be provided as attribute in the web component');
		const parentElement = document.getElementById(this.parentId);

		function hideContent(this: CustomDropdown) {

			if (!this.shadowRoot) throw new Error('shadowRoot must be provided');

			const content = this.shadowRoot.querySelector('#ddContent');
			if (!content) throw new Error('Content element not found');

			content.classList.add('hidden');
			content.classList.add('relative');
			content.classList.remove('absolute');
			content.classList.remove('animate-zoom');
			content.classList.remove('m-auto');
			content.classList.remove('flex');

		}

    function rotateArrow(this: CustomDropdown) {
      const arrowEl = this.shadowRoot?.querySelector("#ddArrow") as HTMLElement;
      const isActive = arrowEl.classList.contains('animate-rotate');
      
      if (isActive) {
        arrowEl.classList.remove('animate-rotate');
        return;
      }

      arrowEl.classList.add('animate-rotate');
    }

    function onMouseLeave(this: CustomDropdown) {
      rotateArrow.bind(this)();
      hideContent.bind(this)();
    }

		if (parentElement) {

      parentElement.addEventListener('mouseenter', rotateArrow.bind(this));
			parentElement.addEventListener('mouseleave', onMouseLeave.bind(this));

		}

	}

}


customElements.define('dropdown-component', CustomDropdown);
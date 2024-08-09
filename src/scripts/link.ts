
class CustomAnchor extends HTMLElement {

    href: null | string = null;

    constructor() {
        super();
    }

    connectedCallback() {
        const href = this.getAttribute('href') || '#';
        const link = document.createElement('a');

        if (!href) throw new Error("attribute href not inserted")

        link.classList.add('border', 'flex', 'cursor-pointer', 'border-primary', 'py-1', 'text-primary', 'transition-all', 'duration-100', 'rounded', 'font-normal', 'w-40', 'hover:bg-primary', 'justify-center', 'hover:text-neutral-50');
        this.href = href;
        link.innerHTML = this.innerHTML;

        link.addEventListener('click', e => this.handleClick.bind(this)(e));
        this.innerHTML = '';
        this.appendChild(link);
    }

    navigate() {
        const navigateEvent = new CustomEvent('route-navigate', {
            detail: { href: this.href },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(navigateEvent)
    }

    handleClick(this: CustomAnchor, e: MouseEvent) {
        e.preventDefault();
        if (!this.href) return;

        this.navigate();
    }

}

customElements.define('anchor-component', CustomAnchor);

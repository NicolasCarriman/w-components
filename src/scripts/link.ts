import { INavigationDetailEvent } from "../types";

class CustomAnchor extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const href = this.getAttribute('href') || '#';
        const link = document.createElement('a');

        if (!href) throw new Error("attribute href not inserted")

        link.classList.add('border', 'flex', 'cursor-pointer', 'border-primary', 'py-1', 'text-primary', 'transition-all', 'duration-100', 'rounded', 'font-normal', 'w-40', 'hover:bg-primary', 'justify-center', 'hover:text-neutral-50');
        link.href = href;
        link.innerHTML = this.innerHTML;
        link.addEventListener('click', e => this.handleClick.bind(this)(e));
        this.innerHTML = '';
        this.appendChild(link);
    }

    navigate(url: URL) {
        const navigateEvent = new CustomEvent<INavigationDetailEvent>('route-navigate', {
            detail: { url: url },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(navigateEvent)
        window.history.pushState({}, '', url);
    }

    handleClick(this: CustomAnchor, e: MouseEvent) {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const url = new URL(target.href);
        this.navigate(url);
    }

}

customElements.define('anchor-component', CustomAnchor);

class CustomCalculator extends HTMLElement {

    private percentage: number = 0;

    constructor() {
        super();

    }

    connectedCallback() {
        const percentage = Number(this.getAttribute('percentage'));
        const name = this.getAttribute('name');
        this.percentage = percentage;

        const content = `
        <p id="calculatorResult"></p>
        <fieldset>
            <input id="calculatorInput" />
        </fieldset>
        <button class="border cursor-pointer border-primary py-2 text-primary transition-all duration-100 rounded font-normal w-40 hover:bg-primary hover:text-neutral-50" type="button" id="calculateBtn"></button>
`;
        const container = document.createElement("div");
        container.className = "flex flex-col";
        container.innerHTML = content;
        this.appendChild(container);


        const result = this.querySelector("#calculatorResult") as HTMLParagraphElement | undefined;
        const input = this.querySelector("#calculatorInput") as HTMLInputElement | undefined;
        const btn = this.querySelector("#calculateBtn") as HTMLButtonElement | undefined;
        if (!result || !input || !btn) throw new Error('Error: ');
        btn.textContent = 'calculate ' + name;

        const calculate = (value: number): number => {
            return value * this.percentage;
        }

        btn.addEventListener('click', function () {

            const inputValue = input.value;
            const invalidInput = isNaN(Number(inputValue));
            if (invalidInput) throw new Error('provided value must be a number');

            const calculatedValue = calculate(Number(inputValue)).toFixed(2);
            result.textContent = calculatedValue;
        })
    }

}

customElements.define('calculator-component', CustomCalculator);

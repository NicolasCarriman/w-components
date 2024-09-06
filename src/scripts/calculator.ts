class CustomCalculator extends HTMLElement {

    private percentage: number = 0;

    constructor() {
        super();
        
        const content = `
                <p id="calculatorResult"></p>
                <fieldset>
                    <input id="calculatorInput" />
                </fieldset>
                <button class="border cursor-pointer border-primary py-2 text-primary transition-all duration-100 rounded font-normal w-40 hover:bg-primary hover:text-neutral-50" type="button" id="calculateBtn"/>
        `;
        const container = document.createElement("div");
        container.className = "flex flex-col";
        container.innerHTML = content; 
        this.appendChild(container);


        const result = this.querySelector("#calculatorResult") as HTMLParagraphElement | undefined;
        const input = this.querySelector("#calculatorInput") as HTMLInputElement | undefined;
        const btn = this.querySelector("#calculateBtn") as HTMLButtonElement | undefined;
        console.log(result);
        if (!result || !input || !btn) throw new Error('Error: ');

        const calculate = (value: number): number => {
            return value * this.percentage;
        }

        btn.addEventListener('click', function () {

            const inputValue = input.value;
            const invalidInput = isNaN(Number(inputValue));
            if (invalidInput) throw new Error('provided value must be a number');

            const calculatedValue = calculate(Number(inputValue));
            result.textContent = calculatedValue.toString();
        })

    }

    connectedCallback() {
        const percentage = Number(this.getAttribute('percentage'));
        this.percentage = percentage;
    }

}

customElements.define('calculator-component', CustomCalculator);
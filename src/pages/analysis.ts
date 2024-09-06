import { Chart } from 'chart.js/auto';
import data from '../mock/data.json';
import interestRates from '../mock/interest_rates.json';
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

interface IDollarReport {
    date: Date;
    buy: number;
    sell: number;
}

enum ChartTypeValue {
    "Default" = 0,
    "Percentage" = 1
}

type RawData = string[];

function getDollarReport(rawData: RawData[]): IDollarReport[] {

    const report = [];

    for (let day in rawData) {

        const currentDay = rawData[day];

        const [strDate, buy, sell] = currentDay;

        const formatDate = strDate.split('/').reverse().join("/");
        const date = new Date(formatDate);
        const formatNumber = (str: string) => {
            const formated = str.replace(",", ".");
            return Number(formated);
        }

        const price: IDollarReport = {
            date,
            buy: formatNumber(buy),
            sell: formatNumber(sell)
        };
        report.push(price);
    }

    return report;
}

type DateMeta = {
    year: number,
    month: number
};
type AverageReport = DateMeta & Omit<IDollarReport, "date">;

function getDateMeta(date: Date): DateMeta {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return { year, month };
}

function getAverage(year: number): AverageReport[] {

    const dollarReport = getDollarReport(data as unknown as RawData[]);;
    const rawPeriods = dollarReport.filter((r) => getDateMeta(r.date).year === year).map(p => JSON.stringify(getDateMeta(p.date)));
    let periods = new Set(rawPeriods);

    const result: AverageReport[] = [];

    for (let period of periods) {

        const currentDateMeta = JSON.parse(period) as unknown as DateMeta;
        const currentPeriodsByMonth = dollarReport.filter((r) => {
            const meta = getDateMeta(r.date);
            return meta.year === currentDateMeta.year && meta.month === currentDateMeta.month
        });

        const average = currentPeriodsByMonth.reduce((acc, current, index) => {

            let buyAmmount = acc.buy + current.buy;
            let sellAmmount = acc.sell + current.sell;

            if (index === currentPeriodsByMonth.length - 1) {
                buyAmmount = (buyAmmount / (index + 1));
                sellAmmount = sellAmmount / (index + 1);
            }

            return {
                date: acc.date,
                sell: sellAmmount,
                buy: buyAmmount
            }

        });

        const { sell, buy } = average;

        result.push({
            ...currentDateMeta,
            sell: Number(sell.toFixed()),
            buy: Number(buy.toFixed())
        })

    }

    return result;
}

function generateCanvas(dateLabels: string[], values: string[], type = ChartTypeValue.Default): void {

    const app = document.getElementById('app');
    if (!app) return;

    const container = document.createElement('div');
    container.className = 'w-[30rem] h-[20rem]';
    const canvas = document.createElement('canvas');

    new Chart(canvas,
        {
            type: 'line',
            data: {
                labels: dateLabels,
                datasets: [{
                    label: 'Series 1', // Name the series
                    data: values, // Specify the data values array
                    fill: false,
                    borderColor: '#5B2333', // Add custom color border (Line)
                    backgroundColor: '#5B2333', // Add custom color background (Points and Fill)
                    borderWidth: 1 // Specify bar border width
                }]
            },
            options: {
                responsive: true, // Instruct chart js to respond nicely.
                maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
                scales: {
                    y: {
                        ticks: {
                            callback: function (v) {
                                const isPercent = type === ChartTypeValue.Percentage;
                                const result = isPercent ? v + ' %' : v;
                                return result;
                            }
                        }
                    }
                }
            }
        }
    );

    container.appendChild(canvas);
    app.appendChild(container);


}

function getInterestData() {
    const months = [];
    const values = ["100"];

    for (let data of interestRates.reverse()) {

        const [month, percent] = data;
        const formatedPercent = percent.replace(",", ".").replace("%", "");
        months.push(month);
        values.push(formatedPercent);
    }

    values.push("30");
    return { months, values }
}

window.addEventListener('render', (e: any) => {

    if (e.detail !== "analysis") return;

    const dateToString = (date: DateMeta): string => `${date.month.toString().length < 2 ? '0' + date.month : date.month}/${date.year}`;

    const interest = getInterestData();
    const average = getAverage(2024);
    const dateLabels = average.sort((a, b) => a.month - b.month).map(a => dateToString(a));
    const values = average.sort((a, b) => a.month - b.month).map(a => a.buy.toString());

    generateCanvas(dateLabels, values);
    generateCanvas(interest.months, interest.values, ChartTypeValue.Percentage);
    const myCalculator = createCalculatorElement((0.37 / 12), 'interest bank arg');
    const nextCalculator = createCalculatorElement((0.20), 'interest dollar');

    const app = document.getElementById('app') as HTMLElement;
    app.append(myCalculator)
    app.append(nextCalculator)
});


function createCalculatorElement(interest: number, name:string) {
    const calculator = document.createElement('calculator-component');
    calculator.setAttribute('percentage', interest.toString());
    calculator.setAttribute('name', name);

    return calculator;
}



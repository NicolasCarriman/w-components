import { createCardElement } from './card';

export * from './card';

const appRoot = document.getElementById("app");
const cardElement = createCardElement({ name: "Juana", description: "Ceo Manager of APL" });
appRoot?.appendChild(cardElement);

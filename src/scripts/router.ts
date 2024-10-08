import { INavigationDetailEvent } from "../types";

interface Route {
    path: string;
    children?: Route;
    urlContent?: string;
}

const router: Array<Route> = [
    {
        path: '/tools',
        children: {
            path: '/analysis',
            urlContent: '/pages/tools/analysis.html'
        }
    }
];

const origin = window.location.origin;
const appContainer = document.getElementById('app');

function getPathNameArr(pathname: string) {
    let count = 0;

    const regexUrl = pathname.replace(/\//g, () => {
        count++;
        return count < 2 ? '/' : '_/';
    });

    return regexUrl.split('_');
}

function getRoutePath(pathname: string) {

    const pathArray = getPathNameArr(pathname);

    function currentRoute(pathArray: string[], router: Route[]) {

        const mappedRouter = new Map(router.map(r => [r.path, r]));

        for (let i = 0; i < pathArray.length; i++) {
            const currentRoutePath = pathArray[i];
            const matched = mappedRouter.get(currentRoutePath);

            if (!matched) continue;

            if (matched.children) return currentRoute(pathArray.slice(i + 1), [matched.children]);

            return matched.urlContent;
        }

    }

    const fileUrl = currentRoute(pathArray, router);
    if (!fileUrl) return null;

    return fileUrl;
}

const renderEvent = (pageName: string) => new CustomEvent("render", {
    detail: pageName
});

async function renderPage(currentFileRoute: string) {
    const file = fetch(new URL(origin + currentFileRoute)).then(r => r.text());
    const htmlElement = await file;
    const dom = new DOMParser().parseFromString(htmlElement, 'text/html');
    const domBody = dom.documentElement.querySelector('body');
    if (!appContainer || !domBody) throw new Error('Body element not found');

    const nodes = Array.from(domBody.children);
    appContainer.innerHTML = '';

    for (let node in nodes) {
        const currentNode = nodes[node];
        appContainer.appendChild(currentNode);
    }
}

async function handleRouter(url: URL) {
    const currentFileRoute = getRoutePath(url.pathname);
    if (!appContainer) throw new Error('App container with id "app" not found');
    if (!currentFileRoute) return;

    appContainer.innerHTML = ""; 

    const analisysHtml = fetch('./pages/analysis.html').then((res) => res.text());
    console.log(await analisysHtml);

    renderPage(currentFileRoute);
    window.dispatchEvent(renderEvent(url.pathname.split("/").reverse()[0]));
};

window.addEventListener('load', () => {
    const currentUrl = new URL(window.location.href, import.meta.url);
    handleRouter(currentUrl);
});

document.addEventListener('route-navigate', (e: any) => {
    const detail: INavigationDetailEvent = e.detail; 
    handleRouter(detail.url);
});

window.addEventListener('popstate', (e: Event) => {
    const target = e.target as Window;
    const currentUrl = new URL(target.location.href);
    handleRouter(currentUrl);
});

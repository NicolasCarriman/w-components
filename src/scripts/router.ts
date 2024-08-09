
const router = {
    'tools': {
        'analysis': 'any'
    }
};

function handleRouter(detail: { href: string }) {
    const splitedState = detail.href.split('/').slice(1);
    const currentRouteName = splitedState[0];
    console.log(currentRouteName);
    window.history.pushState({}, currentRouteName, detail.href);
}


document.addEventListener('route-navigate', (e: any) => {
    handleRouter(e.detail)
})
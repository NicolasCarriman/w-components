export const getKeywordData = async ({ key, country }: { key: string, country: string }) => {

    const url = `https://seo-keyword-research.p.rapidapi.com/keynew.php?keyword=${key}&country=${country}`

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ca085f613bmsh55d87b2b50feba4p11a5e5jsnf1130cc7b82c',
            'x-rapidapi-host': 'seo-keyword-research.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

}

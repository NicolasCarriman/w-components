
export async function fetchData(url: string, method: string, data?: any): Promise<unknown> {
  const parsedData = JSON.stringify(data);

  const request = new Request(`${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? parsedData : null
  });

  const fetchData = fetch(request)
    .then(response => {
      return response.text();
    })
    .catch((err) => {
      throw new Error('Error on fetching report :' + err)
    });

  return fetchData;
}

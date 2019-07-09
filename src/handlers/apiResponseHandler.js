export default async function apiResponseHandler(response) {
  if(response.ok) {
    return response.json();
  } else {
    const json = await _.invoke(response, 'json');
    const message = _.get(json, 'message', 'API returned an error');
    throw new Error(message);
  }
}

import { backendUrl } from '.';

export function generateAuthToken(login, password) {
  let authorization = 'Basic ';
  authorization += Buffer.from(`${login}:${password}`).toString('base64');
  return authorization;
}

function createAuthHeader(login, password) {
  var authorization, headers;

  authorization = generateAuthToken(login, password);
  headers = new Headers();
  headers.append('Authorization', authorization);
  return headers;
}

export function loginAuthenticate(login, password) {
  var headers, request;
  headers = createAuthHeader(login, password);
  request = new Request(
    backendUrl + '/users/authenticate',
    { headers }
  );

  return request;
}

export function getUserRequest(username) {
  return new Request(
    backendUrl + '/users/username/' + encodeURIComponent(username)
  );
}

export function getUserHeroesRequest(uuid) {
  return new Request(
    `${backendUrl}/users/${uuid}/heroes`
  );
}

export function getNotesPartsRequest() {
  return new Request(
    backendUrl + '/notesParts'
  );
}

export function getDefinitionsRequest() {
  return new Request(
    backendUrl + '/definitions'
  );
}

export function createHeroRequest(heroData, authToken) {
  var headers, request;
  headers = new Headers();
  headers.append('Authorization', 'Bearer ' + authToken);
  headers.append('Content-Type', 'application/json');
  
  request = new Request(
    `${backendUrl}/heroes`,
    {
      method: 'POST',
      body: JSON.stringify(heroData),
      headers
    }
  );

  return request;
}

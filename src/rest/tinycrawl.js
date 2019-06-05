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

function createAuthorizedRequestHeaders(authToken) {
  var headers;
  headers = new Headers();
  headers.append('Authorization', 'Bearer ' + authToken);
  headers.append('Content-Type', 'application/json');
  return headers;
}

export function loginAuthenticate(login, password) {
  const headers = createAuthHeader(login, password);
  return new Request(
    `${backendUrl}/users/authenticate`,
    { headers }
  );
}

export function getUserRequest(username) {
  return new Request(
    `${backendUrl}/users/username/${encodeURIComponent(username)}`
  );
}

export function putUserRequest(uuid, authToken, body) {
  const headers = createAuthorizedRequestHeaders(authToken);
  return new Request(
    `${backendUrl}/users/${uuid}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers
    }
  );
}

export function getUserHeroesRequest(uuid) {
  return new Request(
    `${backendUrl}/users/${uuid}/heroes`
  );
}

export function getUserInventoryRequest(username) {
  return new Request(
    `${backendUrl}/users/username/${username}/inventory`
  );
}

export function getNotesPartsRequest() {
  return new Request(
    `${backendUrl}/notesParts`
  );
}

export function getDefinitionsRequest() {
  return new Request(
    `${backendUrl}/definitions`
  );
}

export function getHeroRequest(uuid) {
  return new Request(
    `${backendUrl}/heroes/${uuid}`
  );
}

export function getItemRequest(uuid) {
  return new Request(
    `${backendUrl}/items/${uuid}`
  );
}

export function useItemRequest(uuid, authToken) {
  const headers = createAuthorizedRequestHeaders(authToken);
  return new Request(
    `${backendUrl}/items/${uuid}/use`,
    {
      method: 'POST',
      headers
    }
  );
}

export function createHeroRequest(heroData, authToken) {
  const headers = createAuthorizedRequestHeaders(authToken);
  
  return new Request(
    `${backendUrl}/heroes`,
    {
      method: 'POST',
      body: JSON.stringify(heroData),
      headers
    }
  );
}

export function deleteHeroRequest(uuid, authToken) {
  const headers = createAuthorizedRequestHeaders(authToken);
  
  return new Request(
    `${backendUrl}/heroes/${uuid}`,
    {
      method: 'DELETE',
      headers
    }
  );
}

export function buyTraitRequest(heroId, traitId, authToken) {
  const headers = createAuthorizedRequestHeaders(authToken);

  return new Request(
    `${backendUrl}/heroes/${heroId}/buyTrait`,
    {
      method: 'POST',
      body: JSON.stringify({ traitId }),
      headers
    }
  );
}

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

export function getUserRequest(username, authToken) {
  var headers, request;
  headers = new Headers();
  headers.append('Authorization', authToken);
  request = new Request(
    backendUrl + '/users/username/' + encodeURIComponent(username),
    { headers }
  );

  return request;
}

export function getNotesPartsRequest() {
  return new Request(
    backendUrl + '/notesParts'
  );
}

import { backendUrl } from '.';

export function generateAuthToken(login, password) {
  let authorization = 'Basic ';
  authorization += Buffer.from(`${login}:${password}`).toString('base64');
  return authorization;
}

export function loginAuthenticate(login, password) {
  var authorization, headers, request;

  authorization = generateAuthToken(login, password);
  headers = new Headers();
  headers.append('Authorization', authorization);

  request = new Request(
    backendUrl + '/users/authenticate',
    { headers }
  );

  return request;
}

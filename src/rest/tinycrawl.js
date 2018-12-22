import { backendUrl } from '.';

export function loginAuthenticate(login, password) {
  var authorization, headers, request;

  authorization = 'Basic ';
  authorization += Buffer.from(`${login}:${password}`).toString('base64');
  
  headers = new Headers();
  headers.append('Authorization', authorization);

  request = new Request(
    backendUrl + '/users/authenticate',
    { headers }
  );
  
  return request;
}

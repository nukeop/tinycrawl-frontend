import test from 'ava';

import { backendUrl } from '../src/rest';
import {
  loginAuthenticate
} from '../src/rest/tinycrawl';

require('@babel/polyfill');
require('isomorphic-fetch');

test('check that backend url is not null', t => {
  t.truthy(backendUrl);
});

test('check authenticating users', async t => {
  await fetch(loginAuthenticate('test', 'test'))
    .then(response => {
      t.true(response.status === 401);
      return response.json();
    })
    .then(data => {
      t.true(data !== undefined);
      t.true(Object.keys(data)[0] === 'message');
    });
});

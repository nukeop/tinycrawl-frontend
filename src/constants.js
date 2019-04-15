import React from 'react';

const GITHUB_CLIENT_ID = '32640a3c66815a21712d';
const GITHUB_CLIENT_SECRET = '5b3c01d47f5aead82df45a549b63c4a39653c38d';
const GITHUB_OAUTH_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_OAUTH_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';

const GITHUB_API_USER_ENDPOINT = 'https://api.github.com/user';

const copyrightText = () => (
  <span>
    Copyright © <a href="https://github.com/nukeop/">nukeop</a> 2018, released under AGPL-3.0
  </span>
);

export default {
  copyrightText,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_OAUTH_AUTHORIZE_URL,
  GITHUB_OAUTH_ACCESS_TOKEN_URL,
  GITHUB_API_USER_ENDPOINT
};

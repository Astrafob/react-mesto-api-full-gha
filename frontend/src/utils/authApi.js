import { authApiConfig } from './constants';

class authApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  register({ password, email }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    }).then(this._checkResponse);
  }

  authorize({ password, email }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email
      })
    }).then(this._checkResponse);
  }

  getContent(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Получили ошибку: ${res.status} ${res.statusText}`);
  }
}

const auth = new authApi(authApiConfig);

export default auth;
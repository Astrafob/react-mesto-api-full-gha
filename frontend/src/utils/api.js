import { apiConfig } from "./constants";

class Api {
  constructor(options) {
    this._url = options.url;
    // this._getHeaders(), = options.headers;
  }

  _getHeaders() {
    return {
      'authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    };
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getPersonInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  setUserAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(link)
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._checkResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(idCard, isLiked) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  // deleteLikeCard(idCard) {
  //   return fetch(`${this._url}/cards/${idCard}/likes`, {
  //     method: 'DELETE',
  //     headers: this._getHeaders(),
  //   }).then(this._checkResponse);
  // }

  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Получили ошибку: ${res.status} ${res.statusText}`);
  }
}

const api = new Api(apiConfig);

export default api;
export const apiConfig = {
  // url: 'http://localhost:3000',
  url: 'https://api.mesto.astra.nomoredomains.rocks',
  // url: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    // authorization: 'c9936e4c-070a-4b7d-9c19-b49f7cce0362',
    'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
};

export const authApiConfig = {
  // url: 'https://auth.nomoreparties.co',
  // url: 'http://localhost:3000',
  url: 'https://api.mesto.astra.nomoredomains.rocks',
  headers: {
    'Content-Type': 'application/json'
  }
}
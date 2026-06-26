class Api {
  constructor(token) {
    this.token = token.headers.authorization;
    this.baseUrl = token.baseUrl;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      },
    }).then((res) => this.apiResponse(res));
  }

  editCard(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this.apiResponse(res));
  }

  newCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this.apiResponse(res));
  }

  deleteCard(cardID) {
    return fetch(`${this.baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    }).then((res) => this.apiResponse(res));
  }

  likeCard(cardID) {
    return fetch(`${this.baseUrl}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: {
        authorization: this.token,
      },
    }).then((res) => this.apiResponse(res));
  }

  deleteLikeCard(cardID) {
    return fetch(`${this.baseUrl}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
      },
    }).then((res) => this.apiResponse(res));
  }

  profilePhotoUpdate(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => this.apiResponse(res));
  }

  apiResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // se o servidor retornar um erro, rejeite a promessa
    return Promise.reject(`Error: ${res.status}`);
  }
}

export default Api;

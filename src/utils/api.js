import { serverConfig } from "./utils";

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResult(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);
  }

  getUserInfo = () => {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  };

  getCards = () => {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  };

  patchUserInfo = (name, about) => {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  };

  changeAvatar = (avatar) => {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  };

  postCard = (name, link) => {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkResult(res);
    });
  };

  deleteCard = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  };

  likeCard = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResult(res);
    });
  };

  dislikeCard = (cardId) => {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return this._checkResult(res);
      }
    });
  };
}

export const api = new Api({
  url: `${serverConfig.url}/${serverConfig.cohort}`,
  headers: {
    "Content-type": "application/json",
    authorization: `${serverConfig.token}`,
  },
});

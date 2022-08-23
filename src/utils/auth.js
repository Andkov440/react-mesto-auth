import { baseUrlAuth, headers } from "../utils/utils";

const returnResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.statusText);
};

export const register = (email, password) => {
  return fetch(`${baseUrlAuth}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => returnResult(res));
};

export const authorize = (email, password) => {
  return fetch(`${baseUrlAuth}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email: email, password: password }),
  }).then((res) => returnResult(res));
};

export const getContent = (jwt) => {
  return fetch(`${baseUrlAuth}/users/me`, {
    method: "GET",
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => returnResult(res));
};

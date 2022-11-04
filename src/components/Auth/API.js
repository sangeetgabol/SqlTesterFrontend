import handleError from "../../utils/handleError";
const API_BASEURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
export const login = (username, password) => {
  const data = { username, password };

  return fetch(`${API_BASEURL}/api/user/login`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then(handleError)
    .then((response) => response.json());
};

export const getCurrentUser = () => {
  return fetch(`${API_BASEURL}/api/user/info`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then(handleError)
    .then((response) => response.json());
};

export const logout = () => {
  return fetch(`${API_BASEURL}/api/user/logout`, {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  }).then(handleError);
};

import handleError from "../../utils/handleError";

export const saveDatabase = (title, database) => {
  console.log(database);
  const blob = new Blob([database], {
    type: `application/x-sqlite-3`,
  });

  console.log(blob);
  const data = new FormData();

  data.set("database", blob);

  return fetch(`http://localhost:3001/api/database/save/${title}`, {
    method: "POST",
    body: data,
    credentials: "same-origin",
  })
    .then(handleError)
    .then((res) => res.json());
};

export const loadDatabase = (id) => {
  return fetch(`http://localhost:3001/api/database/load/${id}`, {
    method: "GET",
    credentials: "same-origin",
  })
    .then(handleError)
    .then((res) => res.arrayBuffer());
};

export const deleteDatabase = (id) => {
  return fetch(`http://localhost:3001/api/database/delete/${id}`, {
    method: "GET",
    credentials: "same-origin",
  }).then(handleError);
};

export const listDatabases = () => {
  return fetch("http://localhost:3001/api/database/list", {
    method: "GET",
    credentials: "same-origin",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then(handleError)
    .then((res) => res.json());
};

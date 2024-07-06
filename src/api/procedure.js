import { url } from "./configuration";

export const procedure_index = async () => {
  const response = await fetch(`${url}/procedures`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
    },
  });
  return await response.json();
};

export const procedure_store = async (body) => {
  const response = await fetch(`${url}/procedures`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const procedure_destroy = async (id) => {
  const response = await fetch(`${url}/procedures/${id}`, {
    method: "DELETE",
    headers: {
      Accept: 'application/json',
    },
  });
  return await response.json();
};

export const procedure_update = async (body, id) => {
  const response = await fetch(`${url}/procedures/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
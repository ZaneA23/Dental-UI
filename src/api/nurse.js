import { url } from "./configuration";

export const nurse_index = async () => {
  const response = await fetch(`${url}/nurses`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
    },
  });
  return await response.json();
};

export const nurse_store = async (body) => {
  const response = await fetch(`${url}/nurses`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const nurse_destroy = async (id) => {
  const response = await fetch(`${url}/nurses/${id}?_method=DELETE`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
    },
  });
  return await response.json();
};

export const nurse_update = async (body, id) => {
  const response = await fetch(`${url}/nurses/${id}?_method=PATCH`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
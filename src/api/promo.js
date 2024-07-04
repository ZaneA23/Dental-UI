import { url } from "./configuration";

export const promo_index = async () => {
  const response = await fetch(`${url}/promos`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
    },
  });
  return await response.json();
};

export const promo_store = async (body) => {
  const response = await fetch(`${url}/promos`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const promo_destroy = async (id) => {
  const response = await fetch(`${url}/promos/${id}?_method=DELETE`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
    },
  });
  return await response.json();
};

export const promo_update = async (body, id) => {
  const response = await fetch(`${url}/promos/${id}?_method=PATCH`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
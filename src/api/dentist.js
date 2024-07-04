import { url } from "./configuration";

export const dentist_index = async () => {
  const response = await fetch(`${url}/dentists`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
    },
  });
  return await response.json();
};

export const dentist_store = async (body) => {
  const response = await fetch(`${url}/dentists`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const dentist_destroy = async (id) => {
  const response = await fetch(`${url}/dentists/${id}?_method=DELETE`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
    },
  });
  return await response.json();
};

export const dentist_update = async (body, id) => {
  const response = await fetch(`${url}/dentists/${id}?_method=PATCH`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
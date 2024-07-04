import { url } from "./configuration";

export const appointment_index = async () => {
  const response = await fetch(`${url}/appointments`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
    },
  });
  return await response.json();
};

export const appointment_store = async (body) => {
  const response = await fetch(`${url}/appointments`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};

export const appointment_destroy = async (id) => {
  const response = await fetch(`${url}/appointments/${id}?_method=DELETE`, {
    method: "POST",
    headers: {
      Accept: 'application/json',
    },
  });
  return await response.json();
};

export const appointment_update = async (body, id) => {
  const response = await fetch(`${url}/appointments/${id}?_method=PATCH`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
};
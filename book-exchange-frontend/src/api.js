// src/api.js
const BASE_URL = "http://localhost:7027/api"; // Adjust the port if needed

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
};

export const getBooks = async () => {
  const response = await fetch(`${BASE_URL}/books`);
  if (!response.ok) throw new Error("Failed to fetch books");
  return response.json();
};

export const getProfile = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch user profile");
  return response.json();
};

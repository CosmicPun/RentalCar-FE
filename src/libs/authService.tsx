import { UserItem } from "@/../interface";
import { baseUrl } from '../config/api';

export async function userLogIn(userEmail: string, userPassword: string) {
  const response = await fetch(
    `${baseUrl}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    }
  );
  if (!response.ok) throw new Error("Failed to log in");
  return await response.json();
}

export async function userRegister(name: string, email: string, telephone: string, password: string) {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, telephone, password, role: 'user' }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register");
  }
  return await response.json();
}

export async function userLogout() {
  const response = await fetch(`${baseUrl}/auth/logout`, {
    method: "GET",
  });

  if (!response.ok) throw new Error("Failed to log out");
  return await response.json();
}

export async function userUpdate(token: string, updateData: { name?: string; email?: string; telephone?: string }) {
  const response = await fetch(`${baseUrl}/auth/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) throw new Error("Failed to update user profile");
  return await response.json();
}

export async function getUserProfile(token: string): Promise<{ success: boolean; data: UserItem }> {
  const response = await fetch(
    `${baseUrl}/auth/me`,
    {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    }
  );
  if (!response.ok) throw new Error("Failed to fetch user profile");
  return await response.json();
}
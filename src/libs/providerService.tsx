import { ProviderJson, SingleProviderJson, ProviderItem } from "@/../interface";
import { baseUrl } from '../config/api';

export async function getProviders(): Promise<ProviderJson> {
  const response = await fetch(`${baseUrl}/providers`, { next: { tags: ['providers'] } });
  if (!response.ok) {
    throw new Error("Failed to fetch providers");
  }
  return response.json();
}

export async function getProvider(id: string): Promise<SingleProviderJson> {
  const response = await fetch(`${baseUrl}/providers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch provider");
  }
  return response.json();
}

export async function createProvider(token: string, providerData: Partial<ProviderItem>) {
  const response = await fetch(`${baseUrl}/providers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(providerData),
  });

  if (!response.ok) throw new Error("Failed to create provider");
  return await response.json();
}

export async function updateProvider(token: string, id: string, providerData: Partial<ProviderItem>) {
  const response = await fetch(`${baseUrl}/providers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(providerData),
  });

  if (!response.ok) throw new Error("Failed to update provider");
  return await response.json();
}

export async function deleteProvider(token: string, id: string) {
  const response = await fetch(`${baseUrl}/providers/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to delete provider");
  return await response.json();
}
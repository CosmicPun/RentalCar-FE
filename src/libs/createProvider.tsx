import { ProviderItem } from "@/../interface";

export default async function createProvider(token: string, providerData: Partial<ProviderItem>) {
  const baseUrl = process.env.BACKEND_URL;
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

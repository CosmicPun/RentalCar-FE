import { ProviderItem } from "@/../interface";

export default async function updateProvider(token: string, id: string, providerData: Partial<ProviderItem>) {
  const baseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
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

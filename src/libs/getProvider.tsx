import { ProviderItem } from "@/../interface";

export default async function getProvider(id: string): Promise<{ success: boolean; data: ProviderItem }> {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/providers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch provider");
  }
  return response.json();
}

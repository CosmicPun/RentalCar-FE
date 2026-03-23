import { ProviderJson } from "@/../interface";

export default async function getProviders(): Promise<ProviderJson> {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/providers`, { next: { tags: ['providers'] } });
  if (!response.ok) {
    throw new Error("Failed to fetch providers");
  }
  return response.json();
}

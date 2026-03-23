import { CarJson } from "@/../interface";

export default async function getCars(): Promise<CarJson> {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/cars`, { next: { tags: ['cars'] } });
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return response.json();
}

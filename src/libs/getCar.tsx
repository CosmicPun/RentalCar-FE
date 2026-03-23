import { SingleCarJson } from "@/../interface";

export default async function getCar(id: string): Promise<SingleCarJson> {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/cars/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch car");
  }
  return response.json();
}

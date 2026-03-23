import { CarItem } from "@/../interface";

export default async function createCar(token: string, carData: Partial<CarItem>) {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) throw new Error("Failed to create car");
  return await response.json();
}

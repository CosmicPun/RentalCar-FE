import { CarItem } from "@/../interface";

export default async function updateCar(token: string, id: string, carData: Partial<CarItem>) {
  const baseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await fetch(`${baseUrl}/cars/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) throw new Error("Failed to update car");
  return await response.json();
}

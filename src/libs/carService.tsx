import { CarJson, SingleCarJson, CarItem } from "@/../interface";
import { baseUrl } from '../config/api';

export async function getCars(): Promise<CarJson> {
  const response = await fetch(`${baseUrl}/cars`, { next: { tags: ['cars'] } });
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return response.json();
}

export async function getCar(id: string): Promise<SingleCarJson> {
  const response = await fetch(`${baseUrl}/cars/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch car");
  }
  return response.json();
}

export async function createCar(token: string, carData: Partial<CarItem>) {
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

export async function updateCar(token: string, id: string, carData: Partial<CarItem>) {
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

export async function deleteCar(token: string, id: string) {
  const response = await fetch(`${baseUrl}/cars/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to delete car");
  return await response.json();
}
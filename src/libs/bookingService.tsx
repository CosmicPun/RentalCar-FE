import { BookingJson, SingleBookingJson } from "@/../interface";
import { baseUrl } from '../config/api';

export async function getBookings(token: string): Promise<BookingJson> {
  const response = await fetch(`${baseUrl}/bookings`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch bookings");
  return await response.json();
}

export async function getBooking(token: string, id: string): Promise<SingleBookingJson> {
  const response = await fetch(`${baseUrl}/bookings/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch booking");
  return await response.json();
}

export async function addBooking(token: string, carId: string, bookingDate: string, returnDate: string) {
  const response = await fetch(`${baseUrl}/cars/${carId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookingDate, returnDate }),
  });

  if (!response.ok) throw new Error("Failed to add booking");
  return await response.json();
}

export async function updateBooking(token: string, id: string, bookingDate?: string, returnDate?: string) {
  const response = await fetch(`${baseUrl}/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ bookingDate, returnDate }),
  });

  if (!response.ok) throw new Error("Failed to update booking");
  return await response.json();
}

export async function deleteBooking(token: string, id: string) {
  const response = await fetch(`${baseUrl}/bookings/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to delete booking");
  return await response.json();
}
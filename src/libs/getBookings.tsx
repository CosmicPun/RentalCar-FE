import { BookingJson } from "@/../interface";

export default async function getBookings(token: string): Promise<BookingJson> {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/bookings`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch bookings");
  return await response.json();
}

import { SingleBookingJson } from "@/../interface";

export default async function getBooking(token: string, id: string): Promise<SingleBookingJson> {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/bookings/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch booking");
  return await response.json();
}

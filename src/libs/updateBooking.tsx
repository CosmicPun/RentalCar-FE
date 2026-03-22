export default async function updateBooking(token: string, id: string, bookingDate?: string, returnDate?: string) {
  const baseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
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

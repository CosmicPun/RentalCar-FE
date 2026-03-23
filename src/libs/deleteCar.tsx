export default async function deleteCar(token: string, id: string) {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/cars/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to delete car");
  return await response.json();
}

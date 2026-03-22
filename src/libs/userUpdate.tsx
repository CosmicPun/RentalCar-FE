export default async function userUpdate(token: string, updateData: { name?: string; email?: string; telephone?: string }) {
  const baseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
  const response = await fetch(`${baseUrl}/auth/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) throw new Error("Failed to update user profile");
  return await response.json();
}

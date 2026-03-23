export default async function userLogout() {
  const baseUrl = process.env.BACKEND_URL;
  const response = await fetch(`${baseUrl}/auth/logout`, {
    method: "GET",
  });

  if (!response.ok) throw new Error("Failed to log out");
  return await response.json();
}

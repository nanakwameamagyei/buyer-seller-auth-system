export const register = async (data: {
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller";
}) => {
  const response = await fetch("http://localhost:8000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export const login = async (data: { email: string; password: string }) => {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export const getMe = async (token: string) => {
  const response = await fetch("http://localhost:8000/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

export const logout = async () => {
  localStorage.removeItem("token");
  return { message: "Logged out" };
};
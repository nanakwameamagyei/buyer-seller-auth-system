"use client";
import { useState, useEffect } from "react";
import { getMe, logout } from "../lib/api";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<{
    id: number;
    email: string;
    role: string;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await getMe(token);
          setUser(userData);
        } catch (err) {
          setError("Failed to fetch user.");
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Buyer & Seller Auth System</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <p>Role: {user.role}</p>
          {user.role === "buyer" && (
            <p>
              <Link href="/products">Browse Products</Link>
            </p>
          )}
          {user.role === "seller" && (
            <p>
              <Link href="/dashboard">Manage Listings</Link>
            </p>
          )}
          <button onClick={handleLogout} style={{ padding: "10px 20px" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>Please log in or register.</p>
          <p>
            <Link href="/login">Login</Link> |{" "}
            <Link href="/register">Register</Link>
          </p>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
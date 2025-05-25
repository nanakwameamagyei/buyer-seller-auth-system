"use client";
import { useState, useEffect } from "react";
import { getMe, logout } from "../lib/api";
import Link from "next/link";
import Image from "next/image";

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center">
            <div className="relative w-12 h-12 mr-3">
              <Image
                src="/logo.png"
                alt="Handel Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Handel</h1>
          </div>
          {user && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {user ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Welcome back, {user.email}!
                </h2>
                <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  {user.role === "buyer" ? "Buyer Account" : "Seller Account"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {user.role === "buyer" && (
                  <Link
                    href="/products"
                    className="group block p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">
                          Browse Products
                        </h3>
                        <p className="text-sm text-gray-500">
                          Discover fresh aquaculture products
                        </p>
                      </div>
                    </div>
                  </Link>
                )}

                {user.role === "seller" && (
                  <Link
                    href="/dashboard"
                    className="group block p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">
                          Seller Dashboard
                        </h3>
                        <p className="text-sm text-gray-500">
                          Manage your product listings
                        </p>
                      </div>
                    </div>
                  </Link>
                )}

                <div className="group block p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-gray-900">
                        Account Settings
                      </h3>
                      <p className="text-sm text-gray-500">
                        Update your profile and preferences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Velkommen til Handel
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Tradisjonelt norsk. Radikalt bærekraftig. Den fremste
                markedsplassen for bærekraftige produkter. Handel med hjerte.
                Handel med formål. Vi forbinder kjøpere og selgere i alle
                bransjer.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/login"
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Logg inn
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Registrer
                </Link>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 flex justify-center items-center py-20">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl flex flex-col gap-8 relative z-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-stone-900 text-3xl font-normal leading-9">Welcome Back</h1>
          <p className="text-stone-700 text-sm font-normal leading-5">
            Enter your details to join the elite rental experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200 text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-stone-700 text-xs font-normal uppercase leading-4 tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="px-4 py-5 bg-stone-200 rounded-lg text-stone-900 text-base font-normal outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-stone-700 text-xs font-normal uppercase leading-4 tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-5 bg-stone-200 rounded-lg text-stone-900 text-base font-normal outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-yellow-400 rounded-lg text-lime-950 text-lg font-normal leading-7 shadow-[0px_10px_15px_-3px_rgba(255,214,0,0.20)] hover:bg-yellow-500 transition-colors mt-4"
          >
            Login
          </button>
        </form>

        <div className="pt-6 border-t border-stone-300/30 flex justify-center items-center gap-2">
          <span className="text-stone-700 text-sm font-normal leading-5">Don't have an account?</span>
          <Link href="/register" className="text-stone-900 text-sm font-bold leading-5 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

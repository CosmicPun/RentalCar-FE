"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import userRegister from "@/libs/userRegister";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await userRegister(name, email, telephone, password);
      // Auto-login after registration
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (err: any) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 flex justify-center items-center py-20">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-[0px_40px_80px_-20px_rgba(28,27,27,0.06)] flex flex-col gap-8 relative z-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-stone-900 text-2xl font-bold leading-8">Create your account</h1>
          <p className="text-stone-700 text-sm font-normal leading-5">
            Enter your details to join the elite rental experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200 text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-stone-700 text-xs font-bold uppercase leading-4 tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="px-4 py-4 bg-stone-200 rounded-lg text-stone-900 text-base font-normal outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-stone-700 text-xs font-bold uppercase leading-4 tracking-wider">
              Telephone
            </label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="px-4 py-4 bg-stone-200 rounded-lg text-stone-900 text-base font-normal outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-stone-700 text-xs font-bold uppercase leading-4 tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="px-4 py-4 bg-stone-200 rounded-lg text-stone-900 text-base font-normal outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-stone-700 text-xs font-bold uppercase leading-4 tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="px-4 py-4 bg-stone-200 rounded-lg text-stone-900 text-base font-normal outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-stone-700 text-xs font-bold uppercase leading-4 tracking-wider">
                Confirm
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="px-4 py-4 bg-stone-200 rounded-lg text-stone-900 text-base font-normal outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-yellow-400 rounded-lg text-lime-950 text-sm font-bold uppercase leading-5 tracking-wider shadow-[0px_10px_15px_-3px_rgba(255,214,0,0.20)] hover:bg-yellow-500 transition-colors"
          >
            Register Account
          </button>
        </form>

        <div className="pt-10 border-t border-zinc-100 flex flex-col justify-start items-center gap-4">
          <span className="text-stone-700 text-sm font-medium leading-5 text-center">
            Already have an account?
          </span>
          <Link href="/login" className="flex items-center gap-2 group">
            <span className="text-stone-900 text-sm font-bold leading-5 group-hover:underline">
              Login here
            </span>
            <div className="w-3 h-3 bg-stone-900 rounded-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}

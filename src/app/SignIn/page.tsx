
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    setLoading(true);

    try {
      const { error } = await signIn.email({
        ...user,
        callbackURL: "/",
      });

      if (error) {
        toast.error("লগইন করা যায়নি। ইমেইল ও পাসওয়ার্ড চেক করুন।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    };
  

  const handleGithubSignIn = async () => {
    
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">
        সাইন ইন করুন
      </h1>

      <p className="mt-2 text-center text-sm text-gray-600">
        আপনার অ্যাকাউন্টে লগইন করে সব বিস্তারিত দেখুন।
      </p>

      <div className="mt-8 w-full max-w-md rounded-3xl bg-white p-6 shadow-sm">
        <form onSubmit={onSubmit}>
          <label className="mb-1 block text-sm font-semibold text-gray-800">
            ইমেইল
          </label>

          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            autoComplete="email"
            required
          />

          <label className="mb-1 mt-4 block text-sm font-semibold text-gray-800">
            পাসওয়ার্ড
          </label>

          <input
            name="password"
            type="password"
            placeholder="আপনার পাসওয়ার্ড লিখুন"
            className={inputClass}
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>

        <p className="my-4 text-center text-xs text-gray-400">
          অথবা
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            <span className="font-bold text-blue-500">G</span>
            Google দিয়ে সাইন ইন
          </button>

          <button
            type="button"
            onClick={handleGithubSignIn}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub দিয়ে সাইন ইন
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/SignUp"
            className="font-semibold text-green-600 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 text-sm text-gray-500 hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default SignInPage;

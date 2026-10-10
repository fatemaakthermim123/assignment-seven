"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (user.password !== user.confirmPassword) {
      toast.error("দেওয়া তথ্য মিলছে না, আবার চেষ্টা করুন");
      return;
    }

    setLoading(true);
    const { data, error } = await signUp.email({
      ...user,
      callbackURL: "/",
    });
    console.log(data);
    setLoading(false);

    if (error) {
      toast.error("অ্যাকাউন্ট তৈরি করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    if (data) {
      toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
      router.push("/");
      router.refresh();
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
    <main className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900">
        অ্যাকাউন্ট তৈরি করুন
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="mt-8 w-full max-w-md rounded-3xl bg-white p-6 shadow-sm">
        <form onSubmit={onSubmit}>
          <label className="mb-1 block text-sm font-semibold text-gray-800">
            নাম
          </label>
          <input
            name="name"
            type="text"
            placeholder="আপনার নাম"
            className={inputClass}
            required
          />

          <label className="mb-1 mt-4 block text-sm font-semibold text-gray-800">
            ইমেইল
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            required
          />

          <label className="mb-1 mt-4 block text-sm font-semibold text-gray-800">
            পাসওয়ার্ড
          </label>
          <input
            name="password"
            type="password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            minLength={8}
            className={inputClass}
            required
          />

          <label className="mb-1 mt-4 block text-sm font-semibold text-gray-800">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="আবার লিখুন"
            minLength={8}
            className={inputClass}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <p className="my-4 text-center text-xs text-gray-400">অথবা</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            <span className="font-bold text-blue-500">G</span>
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={handleGithubSignIn}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/SignIn"
            className="font-semibold text-green-600 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-sm text-gray-500 hover:underline">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default SignUpPage;
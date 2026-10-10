"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [isPending, session, router]);

  if (isPending || !session) {
    return <p className="py-20 text-center">লোড হচ্ছে...</p>;
  }

  const { user } = session;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { name, image } = Object.fromEntries(formData.entries()) as {
      name: string;
      image: string;
    };

    setLoading(true);
    const { error } = await authClient.updateUser({ name, image });
    setLoading(false);

    if (error) {
      toast.error("আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("প্রোফাইল আপডেট হয়েছে");
    router.refresh();
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-600">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm">
        
        <img
          src={user.image || "https://api.dicebear.com/9.x/initials/svg?seed=" + user.name}
          alt={user.name}
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-bold">তথ্য আপডেট করুন</h2>

        <label className="mb-1 block text-sm font-semibold">নাম</label>
        <input
          name="name"
          defaultValue={user.name}
          className={inputClass}
          required
        />

        <label className="mb-1 mt-4 block text-sm font-semibold">ছবির URL</label>
        <input
          name="image"
          type="url"
          defaultValue={user.image ?? ""}
          placeholder="https://..."
          className={inputClass}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "অপেক্ষা করুন..." : "আপডেট করুন"}
        </button>
      </form>
    </main>
  );
};

export default ProfilePage;
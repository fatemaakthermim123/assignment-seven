"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {authClient, useSession } from "@/lib/auth-client";

const UserInfo = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div className="h-9 w-24 animate-pulse rounded-full bg-gray-100" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/SignIn"
          className="rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600"
        >
          সাইন ইন
        </Link>
        <Link
          href="/SignUp"
          className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const { user } = session;

  const handleLogout = async () => {
    await authClient. signOut();
    setOpen(false);
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full bg-gray-50 py-1 pl-1 pr-3"
      >
        
        <img
          src={user.image || "https://api.dicebear.com/9.x/initials/svg?seed=" + user.name}
          alt={user.name}
          className="h-9 w-9 rounded-full object-cover"
        />
        <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
        <span className="text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-gray-100 bg-white p-4 shadow-lg">
          <p className="font-bold text-gray-900">{user.name}</p>
          <p className="mb-3 text-sm text-gray-500">{user.email}</p>
          <Link
            href="/Profile"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-2 py-2 text-sm hover:bg-gray-50"
          >
             আমার প্রোফাইল
          </Link>
          <button
            onClick={handleLogout}
            className="mt-1 block w-full rounded-lg px-2 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            ↩ সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
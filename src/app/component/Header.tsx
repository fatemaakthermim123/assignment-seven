"use client"

import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import UserInfo from './UserInfo';

const date= new Date().toLocaleDateString("bn-BD",{
dateStyle:'full',
})



const Header = () => {
    const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className=" py-4 bg-white container mx-auto px-4 mt-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      
      
      <div className="flex items-center gap-2.5">
        <Image
          src="/logo-icon.png"
          alt="logo"
          width={40}
          height={40}
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <div className="grid gap-1">
          <h1 className="text-black font-extrabold text-xl sm:text-2xl lg:text-3xl">
            বাজার দর
          </h1>
          <p className="text-sm md:text-base">{date}</p>
        </div>
      </div>

  <UserInfo></UserInfo>
    </div>
  );
};
export default Header;
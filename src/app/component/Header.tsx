import Image from 'next/image';
import React from 'react';

const date= new Date().toLocaleDateString("bn-BD",{
dateStyle:'full',
})



const Header = () => {
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

      
      <div className="flex gap-2">
        <button className="btn btn-soft btn-sm md:btn-md">সাইন ইন</button>
        <button className="btn btn-success btn-sm md:btn-md">সাইন আপ</button>
      </div>
    </div>
  );
};
export default Header;
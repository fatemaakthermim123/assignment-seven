import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="container mx-auto mt-20 px-4">
      <div className="flex flex-col-reverse items-center justify-between gap-6 rounded- bg-white p-9 shadow-sm md:flex-row md:p-10">
        
        <div className="w-full md:w-3/5">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 sm:text-sm">
            {date}
          </span>

          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
             সর্বনিম্ন- <br/>সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#all products"
            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 sm:text-base"
          >
            সব দাম দেখুন
          </Link>
        </div>

        
        <div className="flex w-full items-center justify-center md:w-2/5">
          <div className="flex h-40 w-40 items-center justify-center rounded-full bg-green-50 text-7xl sm:h-52 sm:w-52 sm:text-8xl">
            
            <Image src='/bazar-hero.png' alt="banner" width={499} height={499}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
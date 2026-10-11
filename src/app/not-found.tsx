import Link from "next/link";



const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-50 via-emerald-100 to-green-200 px-4">
      <div className="max-w-lg text-center">
        
        <h1 className="select-none bg-linear-to-b from-green-500 to-green-800 bg-clip-text text-[10rem] font-black leading-none text-transparent drop-shadow-[0_5px_15px_rgba(22,163,74,0.4)] sm:text-[12rem]">
          ৪০৪
        </h1>

        
        <div className="my-4 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-green-400"></span>
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="h-px w-16 bg-green-400"></span>
        </div>

        
        <h2 className="mb-3 text-2xl font-bold text-green-900 sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>
       

        
        <Link
          href="/"
          className="inline-block rounded-full bg-linear-to-r from-green-500 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg shadow-green-500/40 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:shadow-green-600/50 active:translate-y-0"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
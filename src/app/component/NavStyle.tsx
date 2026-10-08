 "use client";
import Link from 'next/link';
 import React, { useState } from 'react';


  interface navs{
    slug:string,
      id: string,
      nameBn: string,
      icon:string
 }
const NavStyle = ({navs}:{navs:navs[]}) => {
    const [active, setActive] = useState<string>("home");
    const commonStyle=
    "flex shrink-0 items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors";
     const activeStyle = "bg-green-600 text-white";
  const normalStyle = "text-gray-700 hover:text-green-600"
    return (
        <div>
             <div className='flex gap-5'>
            <Link href='/'
            
        onClick={() => setActive("home")}
        className={`${commonStyle} ${active === "home" ? activeStyle : normalStyle}`}>হোম</Link>
        
            {
                navs.map(nav=>
                <Link key={nav.slug} href={`/category/${nav.slug}`}
                 onClick={() => setActive(nav.slug)}
          className={`${commonStyle} ${active === nav.slug ? activeStyle : normalStyle}`}>
            <div  className='flex gap-1'>
                    <span>{nav.icon}</span>
                    <span>{nav.nameBn}</span>
                </div> 
                </Link>)
            }
        
        </div>
        </div>
    );
};

export default NavStyle;
import React from 'react';
import ProductCard from './ProductCard';
  


interface PriceChange {
  dir: "up" | "down" ;
  pct: number;
};

interface Products  {
  id: number; 
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: PriceChange
   categoryNameBn: string,
    categoryIcon:string
  ;
}; 
const AllProducts =async () => {
        const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );
  const products: Products[] = await res.json();
    return (
        <div className='container mx-auto mt-10'>
          <div className='mr-2 space-y-3 mb-4'>  <h1 className='font-bold text-2xl text-black'>সব পণ্য</h1>
            <p>মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p></div>
        <div className='grid grid-cols-3 gap-4 space-y-2.5'>

            {
                products.map(product=><ProductCard key={product.id} product={product}></ProductCard>)
            }
        </div>
        </div>
    );
};

export default AllProducts;
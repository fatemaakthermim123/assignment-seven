"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

interface PriceChange {
  dir: "up" | "down" ;
  pct: number;
}

interface Product {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: PriceChange;
}

const ProductList = ({ products }: { products: Product[] }) => {
  const [sort, setSort] = useState<string>("default");

  const sorted = [...products];
  if (sort === "low") sorted.sort((a, b) => a.today - b.today);
  if (sort === "high") sorted.sort((a, b) => b.today - a.today);

  return (
    <div className="mt-5  ">
      <div className=" mb-4 flex items-center justify-end gap-2 border border-gray-200 p-5 rounded bg-white">
        <span className="text-sm text-gray-600">সাজান:</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-success select-sm w-48"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">কম থেকে বেশি</option>
          <option value="high">বেশি থেকে কম</option>
        </select>
      </div>
      
      <h1>মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
        {sorted.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
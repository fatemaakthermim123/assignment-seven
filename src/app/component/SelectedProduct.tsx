import React from "react";
import ProductCard from "./ProductCard";

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
interface Props {
  id?: string;
  title: string;
  icon: string;
  products: Products[];
};

const SelectedProduct = ({ id, title, icon, products }: Props) => {
  return (
    <section id={id} className="container mx-auto mt-10 px-4">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
        <span>{icon}</span>
        <span>{title}</span>
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default SelectedProduct;
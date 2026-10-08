
import ProductCard from "@/app/component/ProductCard";
import ProductList from "@/app/component/ProductList";
import { notFound } from "next/navigation";

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


const CategoryProducts = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
  );

  const data = await res.json();

  const categoryProducts: Products[] = data;

    if(!categoryProducts) {
        notFound()
    }

   const {categoryIcon,categoryNameBn}=categoryProducts[0];

  return (<div className="container mx-auto mt-7">
    <div className="container mx-auto ">
     <div className="mt-5 flex gap-2 border border-gray-200 p-5 rounded  bg-white">

      <div className="text-4xl">{categoryIcon}</div>
      <div className="flex flex-col"><p className="text-xl font-bold">{categoryNameBn}</p>
        <span>{categoryProducts.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন</span>
      </div>
     </div>

    <ProductList products={categoryProducts} />;
    </div>
    </div>
  );
};

export default CategoryProducts;
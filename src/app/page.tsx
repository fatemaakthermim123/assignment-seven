
import Banner from "./component/banner";
import SelectedProduct from "./component/SelectedProduct";
import AllProducts from "./component/AllProducts";


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

export default async function HomePage () {
    const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );
  const products: Products[] = await res.json();

  // যেগুলোর দাম বেড়েছে: সবচেয়ে বেশি বাড়া আগে, প্রথম COUNT টা
  const increased = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // যেগুলোর দাম কমেছে: সবচেয়ে বেশি কমা আগে, প্রথম COUNT টা
  const decreased = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  return (
    <div>
      
     <Banner></Banner>

     <div className="my-40 ">
      <SelectedProduct
        id="prices"
        title="আজ দাম বেড়েছে"
        icon="📈"
        products={increased}
      />

      <SelectedProduct
        title="আজ দাম কমেছে"
        icon="📉"
        products={decreased}
      />

      <AllProducts></AllProducts>
      </div>
    
    </div>
  );
}

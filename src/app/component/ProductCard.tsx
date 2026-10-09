import Link from "next/link";

interface PriceChange {
  dir: "up" | "down" ;
  pct: number;
};

interface Product  {
  id: number; 
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: PriceChange;
};



const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
  hali: "হালি",
};

const toBn = (n: number) => n.toLocaleString("bn-BD");

const ProductCard = ({ product }: { product: Product }) => {
  const { nameBn, image, unit, today, change } = product;

  
  const badgeStyle =
    change.dir === "down"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-600"
      ;

  const arrow = change.dir === "down" ? "▼" :  "▲" ;

  return (
    <Link href={`/ProductDetails/${product.id}`}>
    <div className="group w-full cursor-pointer rounded-3xl border border-gray-200
     bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-400
      hover:shadow-lg sm:p-5">
      
      <div className="flex items-center gap-3">
       <div className="flex h-14 w-14 shrink-0 items-center justify-center 
       rounded-2xl bg-gray-100 text-3xl transition-all duration-300
        group-hover:scale-110 group-hover:bg-green-100">
  {image}
</div>
        <div>
         <h3 className="text-lg font-bold text-gray-900">{nameBn}</h3>
<p className="text-sm text-gray-600">প্রতি {unitBn[unit] ?? unit}</p>
        </div>
      </div>

      
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-600">আজকের দাম</p>
          <p className="text-2xl font-extrabold text-gray-900">
            {toBn(today)} <span className="text-base font-medium">টাকা</span>
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeStyle}`}
        >
          {arrow} {toBn(change.pct)}%
        </span>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
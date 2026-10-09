import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

interface Product {
    id: number;
    nameBn: string;
    categoryNameBn: string;
    image: string;
    unit: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: { dir: "up" | "down"; pct: number };
    markets: Market[];
}

const unitBn: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

const bn = (n: number) => n.toLocaleString("bn-BD");

const ProductDetails = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const res = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products/${id}`
    );
    if (!res.ok) notFound();
    const p: Product = await res.json();

    const unit = unitBn[p.unit] ?? p.unit;
    const isUp = p.change.dir === "up";
    const diff = Math.abs(p.today - p.yesterday);

    // হিসাব
    const lowest = p.markets.reduce((a, b) => (b.min < a.min ? b : a));
    const highest = p.markets.reduce((a, b) => (b.max > a.max ? b : a));
    const avgPrice = Math.round(
        p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / p.markets.length
    );

    return (
        <main className=" container mx-auto  px-4 py-6">
            {/* Breadcrumb */}
            <p className="mb-4 text-sm text-gray-500">
                <Link href="/" className="hover:underline">হোম</Link>
                {" › "}
                {p.categoryNameBn}
                {" › "}
                <span className="text-gray-800">{p.nameBn}</span>
            </p>

            {/* Hero card */}
            <section className="flex flex-col gap-5 rounded-3xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-100 text-5xl">
                        {p.image}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{p.nameBn}</h1>
                        <p className="text-sm text-gray-500">
                            প্রতি {unit} · {p.categoryNameBn}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            গতকালের তুলনায় আজ দাম {isUp ? "বেড়েছে" : "কমেছে"} {bn(diff)} টাকা
                        </p>
                    </div>
                </div>

                <div className="rounded-2xl bg-gray-50 px-6 py-4 text-center sm:text-right">
                    <p className="text-xs text-gray-500">আজকের দাম</p>
                    <p className="text-4xl font-extrabold text-gray-900">{bn(p.today)}</p>
                    <p className="text-xs text-gray-500">টাকা / {unit}</p>
                    <p className={`mt-1 text-sm font-semibold ${isUp ? "text-red-500" : "text-green-600"}`}>
                        {isUp ? "▲" : "▼"} {bn(p.change.pct)}%
                    </p>
                </div>
            </section>

            {/* Price summary */}
            <section className="mt-8">
                <h2 className="mb-3 text-lg font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-xs text-gray-500">সর্বনিম্ন মূল্য</p>
                        <p className="mt-1 text-3xl font-extrabold text-green-600">
                            {bn(lowest.min)} টাকা
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            সবচেয়ে কম দামের বাজার: {lowest.market}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-xs text-gray-500">সর্বোচ্চ মূল্য</p>
                        <p className="mt-1 text-3xl font-extrabold text-red-500">
                            {bn(highest.max)} টাকা
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            সবচেয়ে বেশি দামের বাজার: {highest.market}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-xs text-gray-500">গড় মূল্য</p>
                        <p className="mt-1 text-3xl font-extrabold text-gray-900">
                            {bn(avgPrice)} টাকা
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            প্রতি {unit} এর হিসাবে
                        </p>
                    </div>
                </div>

            
               
            </section>

            {/* Market-wise table */}
            <section className="mt-8">
                <h2 className="mb-3 text-lg font-bold text-gray-900">
                    বাজারভিত্তিক আজকের দাম
                </h2>

                <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
                    <table className="w-full min-w-[560px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500">
                                <th className="p-4 font-medium">বাজার</th>
                                <th className="p-4 font-medium">বিভাগ</th>
                                <th className="p-4 font-medium">সর্বনিম্ন</th>
                                <th className="p-4 font-medium">সর্বোচ্চ</th>
                                <th className="p-4 font-medium">গড়</th>
                            </tr>
                        </thead>
                        <tbody>
                            {p.markets.map((m, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                                >
                                    <td className="p-4 font-medium text-gray-900">{m.market}</td>
                                    <td className="p-4 text-gray-600">{m.division}</td>
                                    <td className="p-4 font-semibold text-green-600">
                                        {bn(m.min)} টাকা
                                    </td>
                                    <td className="p-4 font-semibold text-red-500">
                                        {bn(m.max)} টাকা
                                    </td>
                                    <td className="p-4 text-gray-900">
                                        {bn(Math.round((m.min + m.max) / 2))} টাকা
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default ProductDetails;
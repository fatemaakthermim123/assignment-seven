import React from 'react';
import MarqueeText from 'react-marquee-text';
import "react-marquee-text/dist/styles.css";

interface Product {
    id: number;
    nameBn: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const Marquee = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    const products: Product[] = await res.json();

    return (
        <div>
            <MarqueeText className="py-1 bg-white" direction="right" duration={15}>
                {products.map(p => (
                    <span key={p.id} className="inline-flex items-center  border-r border-green-300 px-5 py-1">
                       
                        <span>
                            {`${p.nameBn} ${p.today} টাকা/${p.unit} `}
                            <span className={p.change.dir === "up" ? "text-red-500" : "text-green-500"}>
                                {`${p.change.dir === "up" ? "▲" : "▼"} ${p.change.pct}%`}
                            </span>
                        </span>
                    </span>
                ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;
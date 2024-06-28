import Link from "next/link";
import { Key } from "react";

export default async function searchPage(q: any) {
  const getCards = async () => {
    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=name:${q.searchParams.query}`
    );
    return res.json();
  };

  const data = await getCards();

  function getPrice(item: any) {
    let thePrice;

    if (item.tcgplayer?.prices?.normal?.market) {
      thePrice = item.tcgplayer?.prices?.normal?.market
    } else if (item.tcgplayer?.prices?.holofoil?.market) {
      thePrice = item.tcgplayer?.prices?.holofoil?.market
    } else if (item.tcgplayer?.prices?.reverseHolofoil?.market) {
      thePrice = item.tcgplayer?.prices?.reverseHolofoil?.market
    }
    return thePrice
  }

  return (
    <div className="mx-60">
      <ul className="grid grid-cols-5 gap-4 items-center">
        {data.data.map(
          (item: {
            tcgplayer: any;
            number: string;
            set: any; 
            images: any; 
            name: string }, 
            index: Key | null) => (
              <li className="flex flex-center p-8 bg-gray-100 rounded-xl shadow-md" key={index}>
                <Link href="/" className="relative">
                  <img src={item.images.large} className="transition ease-in-out delay-150 hover:scale-105 hover:shadow-xl rounded-md shadow-md"/>
                  <p className="font-bold text-lg pt-4">{item.name} #{item.number}</p>
                  <p className="text-gray-500 text-sm flex gap-1 ">{item.set.name}
                    <img src={item.set.images.symbol} className="w-5 h-5"/>
                  </p>
                  <p className="text-gray-500 text-sm pt-2">
                    Market Price: ${getPrice(item)}

                  </p>
                </Link>
              </li>                
          )
        )}
      </ul>
    </div>
  );
}

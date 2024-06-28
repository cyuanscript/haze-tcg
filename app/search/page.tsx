import Link from "next/link";
import { Key } from "react";

export default async function SearchPage() {
  const getCards = async () => {
    const res = await fetch(
      "https://api.pokemontcg.io/v2/cards?q=name:umbreon"
    );
    return res.json();
  };

  const data = await getCards();

  return (
    <div className="">
      <ul className="grid grid-cols-4 gap-4 items-center">
        {data.data.map(
          (item: {
            number: string;
            set: any; 
            images: any; 
            name: string }, 
            index: Key | null) => (
              <li className="flex flex-center p-8" key={index}>
                <Link href="/" className="relative">
                  <img src={item.images.large} />
                  <h1 className="font-bold text-lg">{item.name} #{item.number}</h1>
                  {item.set.name}           
                </Link>
              </li>                
          )
        )}
      </ul>
    </div>
  );
}

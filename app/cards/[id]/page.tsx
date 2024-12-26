import Link from "next/link";
import Image from "next/image";
import PriceChart from "@/app/components/PriceChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Car } from "lucide-react";

function getPrice(item: any) {
  let thePrice;
  let USD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (item.tcgplayer?.prices?.normal?.market) {
    thePrice = item.tcgplayer.prices.normal.market;
  } else if (item.tcgplayer?.prices?.holofoil?.market) {
    thePrice = item.tcgplayer.prices.holofoil.market;
  } else if (item.tcgplayer?.prices?.reverseHolofoil?.market) {
    thePrice = item.tcgplayer.prices.reverseHolofoil.market;
  } else if (item.tcgplayer?.prices?.unlimitedHolofoil?.market) {
    thePrice = item.tcgplayer.prices.unlimitedHolofoil.market;
  } else if (item.tcgplayer?.prices?.uncommon?.market) {
    thePrice = item.tcgplayer.prices.uncommon.market;
  } else {
    return "N/A";
  }
  return USD.format(thePrice);
}

export default async function cardPage(params: any) {
  const id = params.params.id;

  const getCard = async () => {
    const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
    return res.json();
  };

  const getPriceHistory = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/priceHistory?cardId=${id}`);
    return res.json();
  };

  const theCard = await getCard();
  const priceHistory = await getPriceHistory();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Card Image and Details */}
        <Card>
          <CardHeader>
            <CardTitle>{theCard.data.name} - #{theCard.data.number}</CardTitle>
            <CardDescription>
              <Link href="">
                {theCard.data.set.name}
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center relative">
            <Image
              className="transition ease-in-out delay-150 hover:scale-105 hover:shadow-xl rounded-md shadow-md pb-7"
              src={theCard.data.images.large}
              width={350}
              height={350}
              alt={theCard.data.name}
            />
            <Image
              className="absolute right-1 md:right-28 bottom-2"
              src={theCard.data.set.images.logo}
              width={120}
              height={120}
              alt="set logo"
            />
          </CardContent>
        </Card>

        {/* Right column - Price Charts */}
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Market Price</CardTitle>
              <CardDescription>
                <div className="text-green-700 text-xl font-bold">{getPrice(theCard.data)}</div>
              </CardDescription>
            </CardHeader>
          </Card>
          <div className="">
            <PriceChart priceHistory={priceHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}
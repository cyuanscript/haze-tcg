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
            <CardContent>
              {priceHistory.length > 0 ? (
                <div className="space-y-4">
                  {/* Highest Price */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Highest Price</span>
                    <span className="font-bold text-xl">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(Math.max(...priceHistory.map((entry: { price: any; }) => entry.price)))}
                    </span>
                  </div>

                  {/* Lowest Price */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lowest Price</span>
                    <span className="font-bold text-xl">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(Math.min(...priceHistory.map((entry: { price: any; }) => entry.price)))}
                    </span>
                  </div>

                  {/* Average Price */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average Price</span>
                    <span className="font-bold text-xl">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      }).format(
                        priceHistory.reduce((sum: any, entry: { price: any; }) => sum + entry.price, 0) / priceHistory.length
                      )}
                    </span>
                  </div>

                  {/* Price Change (from first to last entry) */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Price Change</span>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const firstPrice = priceHistory[0].price;
                        const lastPrice = priceHistory[priceHistory.length - 1].price;
                        const change = ((lastPrice - firstPrice) / firstPrice) * 100;
                        const isPositive = change > 0;

                        return (
                          <>
                            <span className={`font-bold text-xl ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                              {change.toFixed(2)}%
                            </span>
                            {isPositive ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* 30-Day Moving Average */}
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">30-Day Average</span>
                    <span className="font-bold text-xl">
                      {(() => {
                        const thirtyDaysAgo = new Date();
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                        
                        const recentPrices = priceHistory.filter(
                          (                          entry: { date: string | number | Date; }) => new Date(entry.date) >= thirtyDaysAgo
                        );

                        if (recentPrices.length === 0) return 'N/A';

                        const average = recentPrices.reduce((sum: any, entry: { price: any; }) => sum + entry.price, 0) / recentPrices.length;

                        return new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD'
                        }).format(average);
                      })()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  No price history available
                </div>
              )}
            </CardContent>
          </Card>
          <div className="">
            <PriceChart priceHistory={priceHistory} />
          </div>
        </div>
        
      </div>
    </div>
  );
}
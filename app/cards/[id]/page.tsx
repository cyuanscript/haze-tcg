import Link from "next/link";
import Image from "next/image";

function getPrice(item: any) {
  let thePrice;
  let USD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (item.tcgplayer?.prices?.normal?.market) {
    thePrice = item.tcgplayer?.prices?.normal?.market;
  } else if (item.tcgplayer?.prices?.holofoil?.market) {
    thePrice = item.tcgplayer?.prices?.holofoil?.market;
  } else if (item.tcgplayer?.prices?.reverseHolofoil?.market) {
    thePrice = item.tcgplayer?.prices?.reverseHolofoil?.market;
  } else if (item.tcgplayer?.prices?.unlimitedHolofoil?.market) {
    thePrice = item.tcgplayer?.prices?.unlimitedHolofoil?.market;
  } else if (item.tcgplayer?.prices?.uncommon?.market) {
    thePrice = item.tcgplayer?.prices?.uncommon?.market;
  } else {
    return "N/A";
  }
  return USD.format(thePrice);
}

const CardPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
  const theCard = await res.json();

  return (
    <div className="flex my-20 mx-40 relative">
      <div className="ml-40">
        <Image
          className="transition ease-in-out delay-150 hover:scale-105 hover:shadow-xl rounded-md shadow-md"
          src={theCard.data.images.large}
          width={350}
          height={350}
          alt={theCard.data.name}
        />
        <Image
          className="w-36 top-full absolute z-10"
          src={theCard.data.set.images.logo}
          width={144}
          height={144}
          alt="set logo"
        />
      </div>
      <div className="text-4xl pt-3 px-6 font-bold">
        <p>
          {theCard.data.name} - #{theCard.data.number}
        </p>
        <Link className="text-xl font-normal px-1 pt-1" href="">
          {theCard.data.set.name}
        </Link>
        <p className="text-green-700">{getPrice(theCard.data)}</p>
      </div>
    </div>
  );
};

export default CardPage;
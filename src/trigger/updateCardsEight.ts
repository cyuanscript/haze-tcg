import { schedules, logger } from "@trigger.dev/sdk/v3";
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

interface CardData {
  id: string;
  name: string;
  set: { name: string };
  number: string;
  tcgplayer?: {
    prices?: {
      normal?: { market?: number };
    };
  };
}

async function fetchAllCards() {
  const pageSize = 250;
  const totalCount = 18506; // Total number of cards
  const totalPages = Math.ceil(totalCount / pageSize);

  for (let i = 71; i <= 75; i++) {
    try {
      const response = await axios.get(`https://api.pokemontcg.io/v2/cards?page=${i}&pageSize=${pageSize}`);
      const cards: CardData[] = response.data.data;

      for (const card of cards) {
        await processCard(card);
      }

      logger.info(`Processed page ${i} of ${totalPages}`);
    } catch (error) {
      logger.error(`Error fetching page ${i}: ${error}`);
      break; // Exit loop on error
    }
  }
}

function getPrice(item: any): number | null {
  if (item.tcgplayer?.prices?.normal?.market) {
    return item.tcgplayer.prices.normal.market;
  } else if (item.tcgplayer?.prices?.holofoil?.market) {
    return item.tcgplayer.prices.holofoil.market;
  } else if (item.tcgplayer?.prices?.reverseHolofoil?.market) {
    return item.tcgplayer.prices.reverseHolofoil.market;
  } else if (item.tcgplayer?.prices?.unlimitedHolofoil?.market) {
    return item.tcgplayer.prices.unlimitedHolofoil.market;
  } else if (item.tcgplayer?.prices?.uncommon?.market) {
    return item.tcgplayer.prices.uncommon.market;
  } else {
    return null;
  }
}

async function processCard(card: CardData) {
  const price = getPrice(card);

  await prisma.card.upsert({
    where: { id: card.id },
    update: {
      name: card.name,
      set: card.set.name,
      number: card.number,
    },
    create: {
      id: card.id,
      name: card.name,
      set: card.set.name,
      number: card.number,
    },
  });

  if (price !== null) {
    await prisma.price.create({
      data: {
        cardId: card.id,
        price: price,
      },
    });
  }
}

export const updateCardPrices = schedules.task({
  id: "update-cards-prices-task-8",
  cron: "0 0 * * *",  // every midnight
  run: async () => {
    await fetchAllCards();
    await prisma.$disconnect(); // Disconnect once done
  },
});
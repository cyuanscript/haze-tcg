import type { NextApiRequest, NextApiResponse } from 'next';
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
  let page = 1;
  const pageSize = 250;
  const totalCount = 18506; // Total number of cards
  const totalPages = Math.ceil(totalCount / pageSize);

  while (page <= totalPages) {
    try {
      const response = await axios.get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`);
      const cards: CardData[] = response.data.data;

      for (const card of cards) {
        await processCard(card);
      }

      console.log(`Processed page ${page} of ${totalPages}`);
      page++;
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await fetchAllCards();
    res.status(200).json({ message: 'Card prices updated successfully' });
  } catch (error) {
    console.error('Error updating card prices:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
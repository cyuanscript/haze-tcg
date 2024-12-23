import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cardId } = req.query;

  if (!cardId || typeof cardId !== 'string') {
    return res.status(400).json({ message: 'Invalid card ID' });
  }

  try {
    const priceHistory = await prisma.price.findMany({
      where: { cardId },
      orderBy: { date: 'asc' },
    });

    res.status(200).json(priceHistory);
  } catch (error) {
    console.error('Error fetching price history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
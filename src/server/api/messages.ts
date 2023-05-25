import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface Message {
  id: number;
  content: string;
  createdAt: Date;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { content }: { content: string } = req.body;
    const newMessage: Message = await prisma.message.create({
      data: {
        content,
      },
    });
    res.json(newMessage);
  } else if (req.method === "GET") {
    const messages: Message[] = await prisma.message.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.json(messages);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { content }: { content: string } = req.body;
    const newMessage: Message = (await prisma.message.create({
      data: {
        content,
      },
    })) as Message;
    res.json(newMessage);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  } else if (req.method === "GET") {
    const messages: Message[] = (await prisma.message.findMany({
      orderBy: {
        createdAt: "asc",
      },
    })) as Message[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.json(messages);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(405).end(); // Method Not Allowed
  }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { content } = req.body;
    const newMessage = await prisma.message.create({
      data: {
        content,
      },
    });
    res.json(newMessage);
  } else if (req.method === "GET") {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.json(messages);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

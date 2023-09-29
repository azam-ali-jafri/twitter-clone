import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method != "POST") res.status(405).end();

  try {
    let { email, username, name, password } = req.body;

    username = username.toLowerCase();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, username, name, hashedPassword },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}

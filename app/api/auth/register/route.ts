import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    email,
    password,
    firstName,
    secondName,
    patronymic,
    organizationName,
    organizationInn,
    // organizationIndustry,
    // country,
    // city,
    position,
  } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "Пользователь уже есть в системе" }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
        firstName,
        secondName,
        patronymic,
        organizationName,
        organizationInn,
        // organizationIndustry,
        // country,
        // city,
        position,
      },
    });
    return NextResponse.json(user);
  }
}

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { schema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    const error = validation.error.errors.map((error) => error.message);
    return NextResponse.json(
      { error: error },
      {
        status: 400,
      }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        hashedPassword: hashedPassword,
      },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong " + error,
      },
      {
        status: 404,
      }
    );
  }
}

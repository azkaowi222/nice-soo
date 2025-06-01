import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  try {
    const response = await fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        accept: "application/json",
      },
    });
    const { id } = await response.json();
    const { data } = await req.json();
    const formattedData = data.map((item) => {
      return {
        name: item?.name,
        description: item?.description,
        cost: item?.cost,
        etd: item?.etd,
        user_id: id,
      };
    });
    await prisma.shipping_cost.deleteMany({
      where: {
        user_id: id,
      },
    });
    await prisma.shipping_cost.createMany({
      data: formattedData,
    });
    return NextResponse.json(
      {
        success: true,
        message: "shipping berhasil ditambahkan",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

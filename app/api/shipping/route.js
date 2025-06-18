import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import prisma from "@/lib/prisma";
export async function POST(req) {
  const { subdisctrict } = await req.json();
  try {
    const response = await fetch(
      `https://rajaongkir.komerce.id/api/v1/destination/domestic-destination?search=${subdisctrict}`,
      {
        headers: {
          key: process.env.RAJAONGKIR_KEY,
        },
      }
    );
    const {
      data: [{ id }],
    } = await response.json();
    const { data } = await calculateCost(id);
    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message,
      },
      {
        status: 500,
      }
    );
  }
}

const calculateCost = async (subdisctrictId) => {
  try {
    const params = {
      origin: "18638",
      destination: subdisctrictId,
      weight: 400,
      courier:
        "jne:sicepat:ide:sap:jnt:ninja:tiki:lion:anteraja:pos:ncs:rex:rpx:sentral:star:wahana:dse",
      price: "lowest",
    };
    const response = await fetch(
      `https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost`,
      {
        method: "POST",
        headers: {
          key: process.env.RAJAONGKIR_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: new URLSearchParams(params),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export async function GET() {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token");
  const headersStore = await headers();
  const token = headersStore.get("Authorization").split(" ")[1];
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
  });
  const { id } = await response.json();
  console.log(`id: ${id}`);
  try {
    const shippingData = await prisma.shipping_cost.findMany({
      where: {
        user_id: id,
      },
    });
    const formattedData = shippingData.map((item) => ({
      ...item,
      id: item.id.toString(), // atau parseInt(item.id)
      user_id: item.user_id.toString(), // lakukan ini untuk semua BigInt
      // ubah field BigInt lainnya juga
    }));
    return NextResponse.json(
      {
        success: true,
        data: formattedData,
      },
      {
        status: 200,
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

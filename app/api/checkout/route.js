import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";
import midtransClient from "midtrans-client";

export async function POST(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const { shipping_cost } = await req.json();
  try {
    const response = await fetch("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        accept: "application/json",
      },
    });
    const { id, first_name, last_name, email, address, phone } =
      await response.json();
    // console.log(data);
    const cart = await prisma.carts.findUnique({
      where: {
        user_id: id,
      },
      include: {
        cart_items: {
          include: {
            products: true,
          },
        },
      },
    });
    const { cart_items } = cart;
    // console.log(cart_items);
    const item_details = cart_items?.map((item) => {
      console.log(item.quantity);
      return {
        id: item.products.id.toString(),
        price: item.products.price,
        quantity: item.quantity,
        name: item.products.name,
        brand: "Midtrans",
        category: "Toys",
        merchant_name: "Midtrans",
        url: "https://tokobuah.com/apple-fuji",
      };
    });
    const subtotal = item_details.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    const { order_number, total } = await prisma.orders.create({
      data: {
        user_id: id,
        order_number: `ORD-${crypto
          .randomBytes(4)
          .toString("hex")
          .toUpperCase()}`,
        status: "pending",
        subtotal,
        shipping_cost,
        total: subtotal + shipping_cost,
        shipping_address: address,
        payment_method: "Midtrans",
        payment_status: "pending",
        order_items: {
          create: cart.cart_items.map((item) => ({
            product_id: item.product_id,
            size: item.size,
            quantity: item.quantity,
            price: item.products.price,
          })),
        },
      },
    });
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const params = {
      transaction_details: {
        order_id: order_number,
        gross_amount: total,
      },
      item_details: [
        ...item_details,
        {
          id: "SHIPPING",
          price: shipping_cost,
          quantity: 1,
          name: "Ongkos Kirim",
        },
      ],
      customer_details: {
        first_name,
        last_name,
        email,
        phone,
        billing_address: {
          first_name,
          last_name,
          email,
          phone,
          address,
          country_code: "IDN",
        },
        shipping_address: {
          first_name,
          last_name,
          email,
          phone,
          address,
          country_code: "IDN",
        },
        credit_card: {
          secure: true,
        },
      },
    };
    // await prisma.cart_items.deleteMany({
    //   where: {
    //     cart_id: cart.id,
    //   },
    // });
    const transaction = await snap.createTransaction(params);
    return NextResponse.json({ success: true, transaction });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      {
        status: 400,
      }
    );
  }
}

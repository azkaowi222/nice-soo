"use client";
import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Calendar,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
} from "lucide-react";
import Image from "next/image";
import Title from "@/app/components/title/Title";
import crypto from "crypto";

const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getOrders = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      const orders = await response.json();
      const formattedOrders = orders.map((order) => {
        return {
          id: order.order_number,
          date: order.created_at.split("T")[0],
          items: order.items?.map((item) => {
            return {
              name: item.product.name,
              quantity: item.quantity,
              price: item.price,
              image: item?.product?.images?.[0]?.image_path,
            };
          }),
          total: order.total,
          status: order.status,
          trackingNumber: `TRK${crypto
            .randomBytes(4)
            .toString("hex")
            .toUpperCase()}`,
          get estimatedDelivery() {
            const day = this.date.split("-")[2];
            const month = this.date.split("-")[1];
            const year = this.date.split("-")[0];
            // console.log(`day: ${day}, month: ${month}, year: ${year}`);
            return `${year}-${month}-${+day + 3}`;
          },
          shippedAddress: order.shipping_address,
        };
      });
      setOrders(formattedOrders);
    };
    getOrders();
  }, []);

  // Sample order data
  //   const orders = [
  //     {
  //       id: "ORD-2024-001",
  //       date: "2024-06-15",
  //       items: [
  //         { name: "MacBook Pro M3", quantity: 1, price: 25000000 },
  //         { name: "Magic Mouse", quantity: 1, price: 1500000 },
  //       ],
  //       total: 26500000,
  //       status: "delivered",
  //       trackingNumber: "TRK123456789",
  //       estimatedDelivery: "2024-06-18",
  //       shippedAddress: "Jl. Sudirman No. 123, Jakarta",
  //     },
  //     {
  //       id: "ORD-2024-002",
  //       date: "2024-06-10",
  //       items: [{ name: "iPhone 15 Pro", quantity: 1, price: 18000000 }],
  //       total: 18000000,
  //       status: "shipped",
  //       trackingNumber: "TRK987654321",
  //       estimatedDelivery: "2024-06-20",
  //       shippedAddress: "Jl. Thamrin No. 456, Jakarta",
  //     },
  //     {
  //       id: "ORD-2024-003",
  //       date: "2024-06-08",
  //       items: [
  //         { name: "iPad Air", quantity: 1, price: 9000000 },
  //         { name: "Apple Pencil", quantity: 1, price: 2000000 },
  //       ],
  //       total: 11000000,
  //       status: "pending",
  //       trackingNumber: null,
  //       estimatedDelivery: "2024-06-22",
  //       shippedAddress: "Jl. Gatot Subroto No. 789, Jakarta",
  //     },
  //     {
  //       id: "ORD-2024-004",
  //       date: "2024-06-05",
  //       items: [{ name: "AirPods Pro", quantity: 2, price: 3500000 }],
  //       total: 7000000,
  //       status: "cancelled",
  //       trackingNumber: null,
  //       estimatedDelivery: null,
  //       shippedAddress: "Jl. Kuningan No. 321, Jakarta",
  //     },
  //   ];

  const getStatusConfig = (status) => {
    const configs = {
      delivered: {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        text: "Terkirim",
      },
      shipped: {
        icon: Truck,
        color: "text-blue-600",
        bg: "bg-blue-100",
        text: "Sedang Dikirim",
      },
      pending: {
        icon: Clock,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        text: "Diproses",
      },
      cancelled: {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-100",
        text: "Dibatalkan",
      },
    };
    return configs[status] || configs.pending;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const orderDate = new Date(order.date);
      const now = new Date();
      const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

      switch (dateFilter) {
        case "7days":
          matchesDate = daysDiff <= 7;
          break;
        case "30days":
          matchesDate = daysDiff <= 30;
          break;
        case "3months":
          matchesDate = daysDiff <= 90;
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 -my-20">
      <Title
        title={"Histori Pesanan"}
        center={false}
        hasIcon={true}
        backTo="/profile"
      />
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari berdasarkan ID pesanan atau nama produk..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer transition-all"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Semua Status</option>
                <option value="pending">Diproses</option>
                <option value="shipped">Sedang Dikirim</option>
                <option value="delivered">Terkirim</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none cursor-pointer transition-all"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">Semua Waktu</option>
                <option value="7days">7 Hari Terakhir</option>
                <option value="30days">30 Hari Terakhir</option>
                <option value="3months">3 Bulan Terakhir</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tidak ada pesanan ditemukan
              </h3>
              <p className="text-gray-600">
                Coba ubah filter pencarian atau buat pesanan baru
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${statusConfig.bg}`}>
                          <StatusIcon
                            className={`w-6 h-6 ${statusConfig.color}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {order.id}
                          </h3>
                          <p className="text-gray-600">
                            Dipesan pada {formatDate(order.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.color}`}
                        >
                          {statusConfig.text}
                        </span>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-6">
                    {/* Items */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Item Pesanan
                      </h4>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                {/* <Package className="w-6 h-6 text-white" /> */}
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                                  width={0}
                                  height={0}
                                  layout="responsive"
                                  // fill
                                  alt="Product Image Cart"
                                  className="object-cover aspect-square rounded-md"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-900">
                              {formatPrice(item.price)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipped Info */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Alamat Pengiriman
                        </h4>
                        <p className="text-gray-600">{order.shippedAddress}</p>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Nomor Resi
                          </h4>
                          <p className="text-blue-600 font-mono">
                            {order.trackingNumber}
                          </p>
                        </div>
                      )}
                    </div>

                    {order.estimatedDelivery &&
                      order.status !== "cancelled" && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            Estimasi Selesai
                          </h4>
                          <p className="text-gray-600">
                            {formatDate(order.estimatedDelivery)}
                          </p>
                        </div>
                      )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-100">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        Detail Pesanan
                      </button>
                      {order.status === "delivered" && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                          <Download className="w-4 h-4" />
                          Download Invoice
                        </button>
                      )}
                      {order.trackingNumber && (
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                          <Truck className="w-4 h-4" />
                          Lacak Pesanan
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination (placeholder) */}
        {filteredOrders.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                Sebelumnya
              </button>
              <span className="px-4 py-2 bg-blue-600 text-white rounded-xl">
                1
              </span>
              <span className="px-4 py-2 text-gray-600">2</span>
              <span className="px-4 py-2 text-gray-600">3</span>
              <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

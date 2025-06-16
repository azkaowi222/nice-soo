"use client";
import Image from "next/image";

export default function Dashboard({ products }) {
  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: "📦",
      color: "bg-blue-500",
    },
    {
      title: "Active Products",
      value: products.filter((p) => p.status === "active").length,
      icon: "✅",
      color: "bg-green-500",
    },
    {
      title: "Low Stock",
      value: products.filter((p) => p.stock < 10).length,
      icon: "⚠️",
      color: "bg-yellow-500",
    },
    {
      title: "Total Value",
      value: `Rp ${products
        .reduce((sum, p) => sum + p.price * p.stock, 0)
        .toLocaleString()}`,
      icon: "💰",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your e-commerce store</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div
                className={`${stat.color} p-3 rounded-lg text-white text-xl mr-4`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Products
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white rounded-lg mr-3 flex items-center justify-center">
                    <Image
                      src={product.image}
                      width={0}
                      height={0}
                      layout="responsive"
                      // fill
                      alt="Product Image Cart"
                      className="object-cover aspect-square rounded-md"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    Rp {product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

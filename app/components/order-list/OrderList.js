"use client";
import { useState } from "react";
import { Eye, Edit, X, Package, Truck, CheckCircle, Clock } from "lucide-react";

export default function OrderList({ orders, setOrders }) {
  // const [orders, setOrders] = useState([
  //   {
  //     id: "ORD-001",
  //     customer: "John Doe",
  //     email: "john@example.com",
  //     total: 15000000,
  //     status: "pending",
  //     date: "2024-01-15",
  //     items: 2,
  //     address: "Jl. Sudirman No. 123, Jakarta",
  //     phone: "+62 812 3456 7890",
  //     products: [
  //       { name: "Laptop Gaming ASUS ROG", quantity: 1, price: 15000000 },
  //     ],
  //   },
  //   {
  //     id: "ORD-002",
  //     customer: "Jane Smith",
  //     email: "jane@example.com",
  //     total: 8000000,
  //     status: "shipped",
  //     date: "2024-01-14",
  //     items: 1,
  //     address: "Jl. Thamrin No. 456, Jakarta",
  //     phone: "+62 813 7890 1234",
  //     products: [
  //       { name: "Smartphone Samsung Galaxy", quantity: 1, price: 8000000 },
  //     ],
  //   },
  //   {
  //     id: "ORD-003",
  //     customer: "Bob Johnson",
  //     email: "bob@example.com",
  //     total: 2500000,
  //     status: "delivered",
  //     date: "2024-01-13",
  //     items: 1,
  //     address: "Jl. Gatot Subroto No. 789, Jakarta",
  //     phone: "+62 814 5678 9012",
  //     products: [
  //       { name: "Sepatu Nike Air Jordan", quantity: 1, price: 2500000 },
  //     ],
  //   },
  // ]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  console.log(selectedOrder);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <X className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setUpdateStatus(order.status);
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = async () => {
    const token = localStorage.getItem("token");
    if (selectedOrder) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_URL}/orders/${selectedOrder.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            status: updateStatus,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("berhasil update status");
        setOrders(
          orders.map((order) =>
            order.id === data.id ? { ...order, status: data.status } : order
          )
        );
      }
      setIsUpdateModalOpen(false);
      setSelectedOrder(null);
      setUpdateStatus("");
    }
  };

  const closeModals = () => {
    setIsViewModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedOrder(null);
    setUpdateStatus("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600">Manage customer orders</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders?.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.order_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer}
                      </div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.items} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Rp {order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="inline-flex items-center px-3 py-1 text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 rounded-md transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleUpdateOrder(order)}
                        className="inline-flex items-center px-3 py-1 text-green-600 hover:text-white hover:bg-green-600 border border-green-600 rounded-md transition-colors duration-200"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Order Modal */}
      {isViewModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Order ID
                  </label>
                  <p className="text-sm text-gray-900">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Order Date
                  </label>
                  <p className="text-sm text-gray-900">{selectedOrder.date}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Customer Information
                </label>
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-gray-900">
                    {selectedOrder.customer}
                  </p>
                  <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.phone}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Shipping Address
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedOrder.address}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Order Status
                </label>
                <span
                  className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full mt-1 ${getStatusColor(
                    selectedOrder.status
                  )}`}
                >
                  {getStatusIcon(selectedOrder.status)}
                  <span className="ml-1 capitalize">
                    {selectedOrder.status}
                  </span>
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Products
                </label>
                <div className="mt-2 space-y-2">
                  {selectedOrder.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          Quantity: {product.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        Rp {product.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    Rp {selectedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Order Modal */}
      {isUpdateModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Update Order Status
              </h2>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID: {selectedOrder.id}
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer: {selectedOrder.customer}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={updateStatus}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/app/components/sidebar/Siderbar";
import Header from "@/app/components/header/Header";
import Dashboard from "@/app/components/dashboard/Dashboard";
import ProductList from "@/app/components/product-list/ProductList";
import ProductForm from "@/app/components/product-form/ProductForm";
import OrderList from "@/app/components/order-list/OrderList";
import UserList from "@/app/components/user-list/UserList";
import Settings from "@/app/components/settings/Settings";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Mock data - replace with actual API calls to your Laravel backend
  useEffect(() => {
    // Simulate fetching data
    const token = localStorage.getItem("token");
    if (token) getAllItems(token);
    // setProducts([
    //   {
    //     id: 1,
    //     name: "Laptop Gaming ASUS ROG",
    //     price: 15000000,
    //     stock: 10,
    //     category: "Electronics",
    //     image: "/api/placeholder/300/200",
    //     status: "active",
    //   },
    //   {
    //     id: 2,
    //     name: "Smartphone Samsung Galaxy",
    //     price: 8000000,
    //     stock: 25,
    //     category: "Electronics",
    //     image: "/api/placeholder/300/200",
    //     status: "active",
    //   },
    //   {
    //     id: 3,
    //     name: "Sepatu Nike Air Jordan",
    //     price: 2500000,
    //     stock: 15,
    //     category: "Fashion",
    //     image: "/api/placeholder/300/200",
    //     status: "inactive",
    //   },
    // ]);
  }, []);

  const getAllItems = async (token) => {
    try {
      const [productsResponse, ordersResponse, usersResponse] =
        await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
            headers: {
              Accept: "application/json",
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/orders`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
      const [allProducts, { data: orderItems }, { data }] = await Promise.all([
        productsResponse.json(),
        ordersResponse.json(),
        usersResponse.json(),
      ]);
      const formattedProducts = allProducts?.map((product) => {
        return {
          id: product.id,
          name: product.name.toUpperCase(),
          price: product.price,
          stock: product.quantity,
          category:
            product.category.name[0].toUpperCase() +
            product.category.name.slice(1),
          image: `${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.images[0].image_path}`,
          status: "active",
        };
      });
      const formattedUsers = data?.map((user) => {
        return {
          id: user.id,
          name: user.first_name,
          email: user.email,
          role: user.is_admin ? "admin" : "customer",
          status: "active",
          orders: user.orders.length,
          joined: user.created_at.split("T")[0],
        };
      });
      const formattedOrders = orderItems?.map((order) => {
        return {
          id: order.order_number,
          customer: order.user.first_name,
          email: order.user.email,
          total: order.total,
          status: order.status,
          date: order.created_at.split("T")[0],
          items: order.items.length,
          address: order.shipping_address,
          phone: order.user.phone ?? "-",
          products: order.items?.map((item) => {
            return {
              name: item.product.name,
              quantity: item.quantity,
              price: item.price,
            };
          }),
        };
      });
      // console.log(orders);
      setProducts(formattedProducts);
      setUsers(formattedUsers);
      setOrders(formattedOrders);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab("product-form");
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setActiveTab("product-form");
  };

  const handleSaveProduct = async (productData) => {
    const token = localStorage.getItem("token");

    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...productData, id: editingProduct.id }
            : p
        )
      );
    } else {
      // Add new product
      try {
        const formData = new FormData();

        // Basic fields
        formData.append("category_id", productData.category_id);
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("quantity", productData.quantity);
        formData.append("status", productData.status);

        // Handle sizes array - append each size
        if (productData["sizes[]"] && productData["sizes[]"].length > 0) {
          productData["sizes[]"].forEach((size) => {
            formData.append("sizes[]", size);
          });
        }

        // Handle images - append actual files, not the array
        if (productData.newImageFiles && productData.newImageFiles.length > 0) {
          productData.newImageFiles.forEach((file) => {
            formData.append("images[]", file); // append File objects
          });
        }

        const response = await fetch(
          "http://localhost:8000/api/admin/products",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              // DON'T set Content-Type for FormData - browser will set it automatically
            },
            body: formData,
          }
        );

        if (response.ok) {
          const newProduct = await response.json();
          console.log(newProduct);
          setProducts([
            ...products,
            {
              id: newProduct.id,
              name: newProduct?.name.toUpperCase(),
              price: newProduct?.price,
              stock: newProduct?.quantity,
              category:
                newProduct?.category?.name[0].toUpperCase() +
                newProduct?.category?.name.slice(1),
              image: `${process.env.NEXT_PUBLIC_IMAGE_URL}/${newProduct?.images[0].image_path}`,
              status: "active",
            },
          ]); // Add to state
          alert("Produk berhasil ditambahkan");
        } else {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          alert(`Gagal menambahkan produk: ${errorData.message}`);
        }
      } catch (error) {
        alert("Produk gagal ditambahkan");
        console.error("Network error:", error.message);
      }
    }

    setActiveTab("products");
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard products={products} />;
      case "products":
        return (
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onAdd={handleAddProduct}
          />
        );
      case "product-form":
        return (
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => setActiveTab("products")}
          />
        );
      case "orders":
        return <OrderList orders={orders} />;
      case "users":
        return <UserList users={users} />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard products={products} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 -my-20">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

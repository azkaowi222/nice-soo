"use client";

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "orders", label: "Orders", icon: "🛒" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <p className="text-sm text-gray-600">E-commerce Management</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
              activeTab === item.id
                ? "bg-blue-50 border-r-4 border-blue-500 text-blue-700"
                : "text-gray-700"
            }`}
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

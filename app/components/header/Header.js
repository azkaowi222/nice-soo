"use client";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome, Admin
          </h2>
          <p className="text-sm text-gray-600">Manage your e-commerce store</p>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            🔔
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <span className="text-sm font-medium text-gray-700">
              Admin User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

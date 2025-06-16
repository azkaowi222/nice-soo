import { useState } from "react";
import { Save, User, Bell, Shield, Globe, Moon, Sun } from "lucide-react";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [settings, setSettings] = useState({
    profile: {
      name: "Admin User",
      email: "admin@example.com",
      phone: "+62 123 456 7890",
      avatar: "",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: true,
      orderAlerts: true,
      stockAlerts: true,
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: "30",
      passwordRequirement: "strong",
    },
    general: {
      language: "en",
      timezone: "Asia/Jakarta",
      currency: "IDR",
      darkMode: false,
    },
  });

  const handleInputChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "general", label: "General", icon: Globe },
  ];

  const renderProfileSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Profile Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) =>
              handleInputChange("profile", "name", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) =>
              handleInputChange("profile", "email", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={settings.profile.phone}
            onChange={(e) =>
              handleInputChange("profile", "phone", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Picture
        </label>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            {settings.profile.name.charAt(0)}
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Change Picture
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Notification Preferences
      </h3>

      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <p className="text-sm text-gray-500">
                {key === "emailNotifications" &&
                  "Receive notifications via email"}
                {key === "pushNotifications" &&
                  "Receive push notifications in browser"}
                {key === "smsNotifications" && "Receive SMS notifications"}
                {key === "orderAlerts" && "Get notified about new orders"}
                {key === "stockAlerts" && "Get notified when stock is low"}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  handleInputChange("notifications", key, e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Two-Factor Authentication
            </label>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorEnabled}
              onChange={(e) =>
                handleInputChange(
                  "security",
                  "twoFactorEnabled",
                  e.target.checked
                )
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <select
            value={settings.security.sessionTimeout}
            onChange={(e) =>
              handleInputChange("security", "sessionTimeout", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Requirement
          </label>
          <select
            value={settings.security.passwordRequirement}
            onChange={(e) =>
              handleInputChange(
                "security",
                "passwordRequirement",
                e.target.value
              )
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="weak">Weak</option>
            <option value="medium">Medium</option>
            <option value="strong">Strong</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderGeneralSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={settings.general.language}
            onChange={(e) =>
              handleInputChange("general", "language", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={settings.general.timezone}
            onChange={(e) =>
              handleInputChange("general", "timezone", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Asia/Jakarta">Asia/Jakarta</option>
            <option value="Asia/Singapore">Asia/Singapore</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={settings.general.currency}
            onChange={(e) =>
              handleInputChange("general", "currency", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="IDR">Indonesian Rupiah (IDR)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="SGD">Singapore Dollar (SGD)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-700">Dark Mode</label>
          <p className="text-sm text-gray-500">Switch to dark theme</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.general.darkMode}
            onChange={(e) =>
              handleInputChange("general", "darkMode", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "notifications":
        return renderNotificationsSection();
      case "security":
        return renderSecuritySection();
      case "general":
        return renderGeneralSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b border-gray-200">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <IconComponent className="w-5 h-5 mr-2" />
                {section.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {renderContent()}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

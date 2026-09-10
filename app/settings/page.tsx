"use client";

import { useState } from "react";
import { User, Lock, Bell, Palette, Users, Database, Shield } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Profile", icon: User },
    { id: "security", name: "Security", icon: Lock },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "appearance", name: "Appearance", icon: Palette },
    { id: "team", name: "Team & Roles", icon: Users },
    { id: "integrations", name: "Integrations", icon: Database },
    { id: "permissions", name: "Permissions", icon: Shield },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Manage your account, team, and system configuration</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-white rounded-xl shadow-sm p-3 md:p-4 lg:h-fit">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center lg:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-4 md:p-8">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "appearance" && <AppearanceSettings />}
          {activeTab === "team" && <TeamSettings />}
          {activeTab === "integrations" && <IntegrationSettings />}
          {activeTab === "permissions" && <PermissionSettings />}
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Profile Settings</h2>
      <div className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="Saksham Maheshwari"
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm md:text-base text-gray-900"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="saksham@pinnaclestudio.com"
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm md:text-base text-gray-900"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              defaultValue="+91 98765 43210"
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm md:text-base text-gray-900"
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Role</label>
            <input
              type="text"
              defaultValue="Founder / Admin"
              disabled
              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm md:text-base text-gray-900"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            rows={4}
            defaultValue="Founder of Pinnacle Studio - a creative agency specializing in video production and social media management."
            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm md:text-base text-gray-900"
          />
        </div>
        <button className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm md:text-base">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Security Settings</h2>
      <div className="space-y-4 md:space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
        <div className="pt-6 border-t">
          <h3 className="font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
          <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            Enable 2FA
          </button>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Update Security Settings
        </button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
      <div className="space-y-6">
        {[
          { title: "Lead Notifications", desc: "Get notified when new leads are added" },
          { title: "Task Updates", desc: "Receive updates when tasks are assigned or completed" },
          { title: "Payment Alerts", desc: "Get notified about invoice and payment status" },
          { title: "Project Deadlines", desc: "Reminders for upcoming project deadlines" },
          { title: "Team Activity", desc: "Stay updated on team member activities" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between py-4 border-b">
            <div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        ))}
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Appearance Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Theme</h3>
          <div className="grid grid-cols-3 gap-4">
            {["Light", "Dark", "Auto"].map((theme) => (
              <button
                key={theme}
                className="p-4 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Accent Color</h3>
          <div className="flex gap-4">
            {["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"].map((color) => (
              <button
                key={color}
                className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamSettings() {
  const team = [
    { name: "Karthik", role: "Editor", email: "karthik@pinnacle.com", status: "active" },
    { name: "Priya", role: "Designer", email: "priya@pinnacle.com", status: "active" },
    { name: "Rahul", role: "Scriptwriter", email: "rahul@pinnacle.com", status: "active" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Team & Roles</h2>
      <button className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
        + Invite Team Member
      </button>
      <div className="space-y-4">
        {team.map((member, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                {member.name[0]}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {member.role}
              </span>
              <button className="text-red-600 hover:text-red-700">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationSettings() {
  const integrations = [
    { name: "Google Drive", status: "connected", icon: "💾" },
    { name: "WhatsApp Business", status: "not-connected", icon: "💬" },
    { name: "Gmail", status: "connected", icon: "📧" },
    { name: "Google Calendar", status: "connected", icon: "📅" },
    { name: "Slack", status: "not-connected", icon: "💼" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Integrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration, idx) => (
          <div key={idx} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{integration.icon}</span>
                <h3 className="font-semibold text-gray-900">{integration.name}</h3>
              </div>
              {integration.status === "connected" ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Connected
                </span>
              ) : (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  Not Connected
                </span>
              )}
            </div>
            <button
              className={`w-full py-2 rounded-lg font-medium transition-colors ${
                integration.status === "connected"
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {integration.status === "connected" ? "Disconnect" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PermissionSettings() {
  const roles = [
    { name: "Founder / Admin", permissions: ["All permissions"] },
    { name: "Sales", permissions: ["View leads", "Create proposals", "Manage clients"] },
    { name: "Project Manager", permissions: ["Manage projects", "Assign tasks", "View reports"] },
    { name: "Content Team", permissions: ["Manage content", "Update calendar", "Upload files"] },
    { name: "Finance", permissions: ["Manage invoices", "View payments", "Financial reports"] },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Role-Based Permissions</h2>
      <div className="space-y-4">
        {roles.map((role, idx) => (
          <div key={idx} className="p-6 border rounded-lg">
            <h3 className="font-bold text-gray-900 mb-3">{role.name}</h3>
            <div className="flex flex-wrap gap-2">
              {role.permissions.map((perm, pidx) => (
                <span key={pidx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                  {perm}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { TrendingUp, TrendingDown, Users, DollarSign, Briefcase, Target } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Mar", leads: 45, converted: 12, revenue: 420000 },
  { month: "Apr", leads: 52, converted: 15, revenue: 580000 },
  { month: "May", leads: 48, converted: 18, revenue: 650000 },
  { month: "Jun", leads: 60, converted: 20, revenue: 720000 },
  { month: "Jul", leads: 55, converted: 22, revenue: 850000 },
  { month: "Aug", leads: 68, converted: 24, revenue: 920000 },
];

const leadSourceData = [
  { name: "Instagram", value: 35, color: "#ec4899" },
  { name: "Referral", value: 25, color: "#8b5cf6" },
  { name: "Website", value: 20, color: "#3b82f6" },
  { name: "WhatsApp", value: 12, color: "#10b981" },
  { name: "Cold Outreach", value: 8, color: "#f59e0b" },
];

const teamProductivity = [
  { name: "Karthik", tasksCompleted: 45, hoursLogged: 180 },
  { name: "Priya", tasksCompleted: 38, hoursLogged: 152 },
  { name: "Saksham", tasksCompleted: 42, hoursLogged: 168 },
  { name: "Rahul", tasksCompleted: 35, hoursLogged: 140 },
  { name: "Neha", tasksCompleted: 40, hoursLogged: 160 },
];

const contentPerformance = [
  { platform: "Instagram", posts: 120, engagement: 8.5 },
  { platform: "YouTube", posts: 45, engagement: 12.3 },
  { platform: "LinkedIn", posts: 60, engagement: 6.2 },
  { platform: "Facebook", posts: 80, engagement: 5.8 },
];

export default function Analytics() {
  const totalLeads = salesData.reduce((sum, d) => sum + d.leads, 0);
  const totalConverted = salesData.reduce((sum, d) => sum + d.converted, 0);
  const conversionRate = ((totalConverted / totalLeads) * 100).toFixed(1);
  const avgDealSize = (salesData.reduce((sum, d) => sum + d.revenue, 0) / totalConverted / 1000).toFixed(0);

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1 text-sm md:text-base">Deep insights on sales, operations, and performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg">
              <Users className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <span className="text-gray-600 text-xs md:text-sm">Total Leads (6M)</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalLeads}</p>
          <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-green-600">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            <span>+12% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-green-100 rounded-lg">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <span className="text-gray-600 text-xs md:text-sm">Conversion Rate</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{conversionRate}%</p>
          <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-green-600">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            <span>+3% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <span className="text-gray-600 text-xs md:text-sm">Avg. Deal Size</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">₹{avgDealSize}K</p>
          <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-red-600">
            <TrendingDown className="w-3 h-3 md:w-4 md:h-4" />
            <span>-5% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-orange-100 rounded-lg">
              <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
            </div>
            <span className="text-gray-600 text-xs md:text-sm">Active Projects</span>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">18</p>
          <div className="flex items-center gap-1 mt-2 text-xs md:text-sm text-green-600">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            <span>+2 this month</span>
          </div>
        </div>
      </div>

      {/* Sales & Revenue Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} name="Revenue (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Lead Source Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} (${entry.value}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {leadSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Productivity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Team Productivity (This Month)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={teamProductivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasksCompleted" fill="#8b5cf6" name="Tasks Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Content Performance by Platform</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={contentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="platform" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Bar dataKey="posts" fill="#3b82f6" name="Posts" />
              <Bar dataKey="engagement" fill="#10b981" name="Engagement %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Sales Conversion Funnel</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Legend />
            <Bar dataKey="leads" fill="#6366f1" name="Leads" />
            <Bar dataKey="converted" fill="#10b981" name="Converted" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

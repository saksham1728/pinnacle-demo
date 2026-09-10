"use client";

import { invoices, profitabilityData } from "@/lib/dummy-data";
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const statusConfig: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  paid: {
    bg: "bg-green-100",
    text: "text-green-700",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  partial: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    icon: <Clock className="w-4 h-4" />,
  },
  overdue: {
    bg: "bg-red-100",
    text: "text-red-700",
    icon: <AlertCircle className="w-4 h-4" />,
  },
  pending: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    icon: <Clock className="w-4 h-4" />,
  },
};

export default function Finance() {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReceived = invoices.reduce((sum, inv) => sum + inv.received, 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.balance, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Finance & Profitability</h1>
        <p className="text-gray-600 mt-1">Track invoices, payments, and project profitability</p>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5" />
            <span className="text-sm opacity-90">Total Revenue</span>
          </div>
          <p className="text-3xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</p>
          <p className="text-sm opacity-75 mt-1">This quarter</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm opacity-90">Collected</span>
          </div>
          <p className="text-3xl font-bold">₹{(totalReceived / 100000).toFixed(1)}L</p>
          <p className="text-sm opacity-75 mt-1">
            {((totalReceived / totalRevenue) * 100).toFixed(0)}% collection rate
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm opacity-90">Outstanding</span>
          </div>
          <p className="text-3xl font-bold">₹{(totalOutstanding / 100000).toFixed(1)}L</p>
          <p className="text-sm opacity-75 mt-1">Pending collection</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm opacity-90">Avg. Profit Margin</span>
          </div>
          <p className="text-3xl font-bold">32%</p>
          <p className="text-sm opacity-75 mt-1">Across all projects</p>
        </div>
      </div>

      {/* Profitability Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Client-wise Profitability</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={profitabilityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="client" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#6366f1" name="Revenue" />
            <Bar dataKey="profit" fill="#10b981" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            + New Invoice
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Invoice ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Received</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Balance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => {
                const config = statusConfig[invoice.status];
                return (
                  <tr key={invoice.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm font-medium text-gray-900">{invoice.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900">{invoice.client}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{(invoice.total / 1000).toFixed(0)}K
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-green-600 font-medium">
                        ₹{(invoice.received / 1000).toFixed(0)}K
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-sm font-medium ${invoice.balance > 0 ? "text-red-600" : "text-gray-400"}`}>
                        ₹{(invoice.balance / 1000).toFixed(0)}K
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">
                        {new Date(invoice.dueDate).toLocaleDateString('en-IN')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                        {config.icon}
                        {invoice.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profitability Table */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Project Profitability Analysis</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Cost</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Profit</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Margin</th>
              </tr>
            </thead>
            <tbody>
              {profitabilityData.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-900">{item.client}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm text-gray-900">₹{(item.revenue / 100000).toFixed(1)}L</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm text-red-600">₹{(item.cost / 100000).toFixed(1)}L</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm font-semibold text-green-600">₹{(item.profit / 100000).toFixed(1)}L</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.margin >= 30 
                        ? "bg-green-100 text-green-700" 
                        : item.margin >= 20
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {item.margin.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

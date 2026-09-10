"use client";

import { dashboardStats, myAttentionItems, revenueChartData } from "@/lib/dummy-data";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  DollarSign, 
  Users, 
  Briefcase,
  Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function Dashboard() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Good Morning, Saksham 👋</h1>
        <p className="text-gray-600 mt-1">Here's what needs your attention today</p>
      </div>

      {/* My Attention Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="text-red-500" />
          My Attention (Top 5 Priorities)
        </h2>
        <div className="grid gap-3">
          {myAttentionItems.map((item) => (
            <div 
              key={item.id}
              className={`p-4 rounded-lg border-l-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
                item.priority === "critical" 
                  ? "border-red-500" 
                  : item.priority === "urgent"
                  ? "border-orange-500"
                  : "border-yellow-500"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.type === "payment" && `Amount: ${item.amount}`}
                    {item.type === "lead" && `Client: ${item.client}`}
                    {item.type === "shoot" && `Location: ${item.location}`}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.priority === "critical" 
                    ? "bg-red-100 text-red-700" 
                    : item.priority === "urgent"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {item.priority.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Sales Stats */}
        <StatCard
          title="New Leads"
          value={dashboardStats.sales.newLeads}
          subtitle="This week"
          icon={<Users className="w-6 h-6 text-blue-500" />}
          trend="up"
          trendValue="12%"
        />
        <StatCard
          title="Active Projects"
          value={dashboardStats.operations.activeProjects}
          subtitle={`${dashboardStats.operations.delayedProjects} delayed`}
          icon={<Briefcase className="w-6 h-6 text-purple-500" />}
          trend="neutral"
        />
        <StatCard
          title="Revenue (This Month)"
          value={`₹${(dashboardStats.finance.revenue / 100000).toFixed(1)}L`}
          subtitle="Target: ₹10L"
          icon={<DollarSign className="w-6 h-6 text-green-500" />}
          trend="up"
          trendValue="8%"
        />
        <StatCard
          title="Overdue Payments"
          value={`₹${(dashboardStats.finance.overduePayments / 100000).toFixed(1)}L`}
          subtitle="Immediate action needed"
          icon={<Clock className="w-6 h-6 text-red-500" />}
          trend="down"
          trendValue="5%"
        />
      </div>

      {/* Sales Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue & Profit Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#6366f1" 
                strokeWidth={3}
                name="Revenue"
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <QuickStat label="Follow-ups Today" value={dashboardStats.sales.followUpsToday} color="blue" />
            <QuickStat label="Meetings Scheduled" value={dashboardStats.sales.meetings} color="purple" />
            <QuickStat label="Proposals Pending" value={dashboardStats.sales.proposalsPending} color="orange" />
            <QuickStat label="Tasks Overdue" value={dashboardStats.operations.tasksOverdue} color="red" />
            <QuickStat label="Content Approval" value={dashboardStats.operations.contentAwaitingApproval} color="green" />
            <QuickStat label="Upcoming Shoots" value={dashboardStats.operations.upcomingShoots} color="indigo" />
          </div>
        </div>
      </div>

      {/* Operations & Finance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Pipeline Value</h3>
          <p className="text-4xl font-bold mb-2">₹{(dashboardStats.sales.pipelineValue / 100000).toFixed(1)}L</p>
          <p className="text-indigo-100">Expected revenue: ₹{(dashboardStats.sales.expectedRevenue / 100000).toFixed(1)}L</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Expected Cash Flow</h3>
          <p className="text-4xl font-bold mb-2">₹{(dashboardStats.finance.expectedCashflow / 100000).toFixed(1)}L</p>
          <p className="text-green-100">Collections: ₹{(dashboardStats.finance.collections / 100000).toFixed(1)}L</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue 
}: { 
  title: string; 
  value: string | number; 
  subtitle: string; 
  icon: React.ReactNode; 
  trend?: "up" | "down" | "neutral"; 
  trendValue?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          {icon}
        </div>
        {trend && trend !== "neutral" && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}>
            {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

function QuickStat({ label, value, color }: { label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
    red: "bg-red-100 text-red-700",
    green: "bg-green-100 text-green-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className={`px-3 py-1 rounded-full font-bold ${colorMap[color]}`}>
        {value}
      </span>
    </div>
  );
}
